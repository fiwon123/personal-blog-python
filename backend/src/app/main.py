from fastapi import APIRouter, FastAPI
from .routers import articles, auth
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv


app = FastAPI(
    title="Blog API",
    version="0.0.1",
    description="Blog endpoints",
    docs_url="/docs",
)

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip().strip('"').strip("'")
        for origin in os.getenv("ALLOW_ORIGINS", "http://localhost:5173").split(",")
        if origin.strip().strip('"').strip("'")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

v_router = APIRouter(
    prefix="/v1",
    tags=["v1"],
)

v_router.include_router(articles.router)
v_router.include_router(auth.router)
app.include_router(v_router)


@app.get("/health")
async def get_health():
    return {"status": "ok"}
