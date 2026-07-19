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

        # The uv workspace (pyproject.toml + uv.lock) lives in backend/.
        workspace = uv2nix.lib.workspace.loadWorkspace { workspaceRoot = ./backend; };

        overlay = workspace.mkPyprojectOverlay { sourcePreference = "wheel"; };

        pythonSet = (pkgs.callPackage pyproject_nix.build.packages { inherit python; }).overrideScope (
          lib.composeManyExtensions [
            pyproject_build_systems.overlays.wheel
            overlay
          ]
        );

        venv = pythonSet.mkVirtualEnv "backend-env" workspace.deps.default;
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

        packages.frontend = pkgs.buildNpmPackage {
          pname = "frontend";
          version = "0.1.0";
          src = ./frontend;

          npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
          npmBuildScript = "build";
        };

        packages.default = self.packages.${system}.backend;
      }
    );
}
