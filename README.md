# Personal Blog

A simple personal blog

Project Description: https://roadmap.sh/projects/personal-blog

**Quick links**

- Live API docs: http://localhost:8000/docs (when backend is running)

## Features

- See Article
- Admin panel for articles CRUD

## Tech stack

- Backend: FastAPI, SQLAlchemy, Alembic
- Frontend: React, TypeScript, Vite
- Database: Postgres (development via Docker)

## Quickstart (recommended: Docker Compose)

The easiest way to run the whole stack is with Docker Compose. From the project root:

```bash
docker compose up --build
```

This starts the backend (http://localhost:8000) and the frontend (http://localhost:5173) + Postgres

Open the frontend at http://localhost:5173 and the API docs at http://localhost:8000/docs.

## Environment variables

in Root Folder and Backend folder you need to change `.env.example` to `.env` (root folder and backend/ folder )

- Backend (see `backend/.env` or Docker env in `docker-compose.yaml`):
  - `POSTGRES_*` — Postgres connection string
  - `SECRET_KEY` - JWT key for generate json token (you can use any jwt generator)

Note: When using Docker Compose the compose file already configures sensible defaults for local development.

## Admin

- To access Dashboard on Frontend you can use `/admin` on http://localhost:5173/admin and use this following credential:
  ```
  username: admin
  password: admin
  ```
