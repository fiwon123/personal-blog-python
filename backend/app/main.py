from fastapi import APIRouter, FastAPI
from .routers import articles

app = FastAPI(
    title="Blog API",
    version="0.0.1",
    description="Blog endpoints",
    docs_url="/docs",
)

v_router = APIRouter(
    prefix="/v1",
    tags=["v1"],
)

v_router.include_router(articles.router)
app.include_router(v_router)


@app.get("/health")
async def get_health():
    return {"status": "ok"}
