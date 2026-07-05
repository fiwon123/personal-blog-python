{
  description = "Dev Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        python = pkgs.python312;
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            python
            uv
            nodejs_22
            corepack
            docker
            kubectl
            kustomize
            helm
            git
          ];

          shellHook = ''
            echo "Dev shell loaded"
            export UV_PYTHON=${python}/bin/python
          '';
        };

        packages.backend = pkgs.stdenv.mkDerivation {
          pname = "backend";
          version = "0.1.0";
          src = ./backend;

          nativeBuildInputs = [
            python
            pkgs.uv
          ];

          buildPhase = ''
            echo "Backend build placeholder"
          '';

          installPhase = ''
            mkdir -p $out
            cp -r . $out/
          '';
        };

        packages.frontend = pkgs.stdenv.mkDerivation {
          pname = "frontend";
          version = "0.1.0";
          src = ./frontend;

          nativeBuildInputs = [
            pkgs.nodejs_22
            pkgs.corepack
          ];

          buildPhase = ''
            corepack enable
            npm install
            npm run build
          '';

          installPhase = ''
            mkdir -p $out
            cp -r dist $out/
          '';
        };

        packages.default = self.packages.${system}.backend;
      });
}
