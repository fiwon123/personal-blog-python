image: clean image-front image-back

build: clean build-back build-front

clean: 
	rm -f result-frontend 
	rm -f result-frontend-image
	rm -f result-backend 
	rm -f result-backend-image

clean-nix:
	nix store gc

build-back:
	nix build .#backend --out-link result-backend 

build-front:
	nix build .#frontend --out-link result-frontend 

image-front:
	nix build .#frontendImage --out-link result-frontend-image

image-back:
	nix build .#backendImage --out-link result-backend-image 

paths:
	nix build .#backend --out-link result-backend --print-out-paths
	nix build .#frontend --out-link result-frontend --print-out-paths

run-all: run-postgres run-back run-front

run-postgres:
	docker compose up -d postgres

run-back:
	docker load -i result-backend-image
	docker run -d --name backend --network backend-net --env-file "./backend/.env" --rm -p 8000:8000 personal-blog-python-backend-nix:0.1.0

run-front:
	docker load -i result-frontend-image
	docker run -d --name frontend --rm -p 5173:80 personal-blog-python-frontend-nix:0.1.0

stop:
	docker stop  backend
	docker stop  frontend
	docker compose down

remove: 
	docker rm -f  backend
	docker rm -f  frontend
	docker compose down