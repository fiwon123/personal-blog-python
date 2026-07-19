build:
	nix build .#backend --out-link result-backend
	nix build .#frontend --out-link result-frontend

show-path:
	nix build .#backend --out-link result-backend --print-out-paths
	nix build .#frontend --out-link result-frontend --print-out-paths