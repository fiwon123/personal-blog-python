{
  description = "Dev Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    pyproject_nix = {
      url = "github:pyproject-nix/pyproject.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    uv2nix = {
      url = "github:pyproject-nix/uv2nix";
      inputs.pyproject-nix.follows = "pyproject_nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    pyproject_build_systems = {
      url = "github:pyproject-nix/build-system-pkgs";
      inputs.pyproject-nix.follows = "pyproject_nix";
      inputs.uv2nix.follows = "uv2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      uv2nix,
      pyproject_nix,
      pyproject_build_systems,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        lib = pkgs.lib;

        python = pkgs.python314;

        workspace = uv2nix.lib.workspace.loadWorkspace { workspaceRoot = ./backend; };
        overlay = workspace.mkPyprojectOverlay { sourcePreference = "wheel"; };

        pythonSet = (pkgs.callPackage pyproject_nix.build.packages { inherit python; }).overrideScope (
          lib.composeManyExtensions [
            pyproject_build_systems.overlays.wheel
            overlay
          ]
        );

        venv = pythonSet.mkVirtualEnv "backend-env" workspace.deps.default;

        frontendBuild = pkgs.buildNpmPackage {
          pname = "frontend";
          version = "0.1.0";
          src = ./frontend;

          npmDepsHash = "sha256-SpFGarQ2SC/3YP7ZMcX5ZqRp9Xwak7SL8olHIOgN6yw=";
          npmBuildScript = "build";

          # VITE_API_URL = "https://api.example.com";
          
          installPhase = ''
            mkdir -p $out/
            cp -r . $out/
          '';
        };

      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            python314
            uv
            nodejs_22
            docker
            kubectl
            kustomize
            helm
            git
            gnumake
          ];
          shellHook = ''
            echo "Dev shell loaded"
            export UV_PYTHON=${pkgs.python314}/bin/python
          '';
        };

        packages.backend = venv;
        packages.frontend = frontendBuild;

        packages.backendImage = pkgs.dockerTools.buildImage {
          name = "personal-blog-python-backend-nix";
          tag = "0.1.0";

          copyToRoot = pkgs.buildEnv {
            name = "backend-image-root";
            paths = [
              venv
              pkgs.glibc
              pkgs.cacert
              pkgs.openssl
            ];
          };

          config = {
            Cmd = [ "uvicorn" "app.main:app" "--host" "0.0.0.0" "--port" "8000" ];
            ExposedPorts = { "8000/tcp" = {}; };
          };
        };

        packages.frontendImage = pkgs.dockerTools.buildImage {
          name = "personal-blog-python-frontend-nix";
          tag = "0.1.0";

          fromImage = pkgs.dockerTools.pullImage {
            imageName = "nginx";
            imageDigest = "sha256:4a73073bd557c65b759505da037898b61f1be6cbcc3c2c3aeac22d2a470c1752";
            sha256 = "sha256-pzb5TJrbnB8mR1Hf68g6BX82SzlERFqL8ecot4FymIY=";
          };

          copyToRoot = pkgs.runCommand "frontend-site" { } ''
            mkdir -p $out/usr/share/nginx/html
            cp -r ${frontendBuild}/dist/. $out/usr/share/nginx/html/

            mkdir -p $out/etc/nginx/conf.d
            cat > $out/etc/nginx/conf.d/default.conf <<'EOF'
            server {
              listen 80;
              server_name _;

              root /usr/share/nginx/html;
              index index.html;

              location / {
                try_files $uri $uri/ /index.html;
              }
            }
            EOF
          '';

          config = {
            Cmd = [ "/usr/sbin/nginx" "-g" "daemon off;" ];
            ExposedPorts = { "80/tcp" = {}; };
          };
        };

        packages.default = self.packages.${system}.backend;
      }
    );
}
