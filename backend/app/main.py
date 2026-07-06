from fastapi import FastAPI, APIRouter

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


@app.get("/health")
async def get_health():
    return {"status": "ok"}
