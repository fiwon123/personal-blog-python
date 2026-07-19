build:
	nix build .#backend --out-link result-backend 
	nix build .#frontend --out-link result-frontend 

build-back:
	nix build .#backend --out-link result-backend 

build-front:
	nix build .#frontend --out-link result-frontend 

image:
	nix build .#backendImage --out-link result-backend-image
	nix build .#frontendImage --out-link result-frontend-image 

image-front:
	rm -f result-frontend-image
	nix build .#frontendImage --out-link result-frontend-image

image-back:
	nix build .#backendImage --out-link result-backend-image 

paths:
	nix build .#backend --out-link result-backend --print-out-paths
	nix build .#frontend --out-link result-frontend --print-out-paths

run-back:
	docker load -i result-backend-image
	docker run --network backend-net --env-file "./backend/.env" --rm -p 8000:8000 personal-blog-python-backend-nix:0.1.0

run-front:
	docker load -i result-frontend-image
	docker run --rm -p 5173:80 personal-blog-python-frontend-nix:0.1.0