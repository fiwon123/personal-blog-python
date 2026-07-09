from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.articles import CreateArticleRequest

from ..database.db import get_db
from ..repositories.article import ArticleRepository
from ..services.articles import ArticleService

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)

articles = [
    {
        "id": "1",
        "title": "title",
        "content": "content",
        "date": "date",
    },
    {
        "id": "2",
        "title": "title",
        "content": "content",
        "date": "date",
    },
    {
        "id": "3",
        "title": "title",
        "content": "content",
        "date": "date",
    },
]


def get_article_service(db: Session = Depends(get_db)):
    repo = ArticleRepository(db)
    return ArticleService(repo)


@router.get("", status_code=status.HTTP_200_OK)
async def get_articles():
    return articles


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_article(
    request: CreateArticleRequest,
    service: ArticleService = Depends(get_article_service),
):
    article = service.create_article(request.title, request.content)

    if article is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="server error"
        )

    return article


@router.put("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_article(id: str, article: dict[str, str]):
    for art in articles:
        if art.get("id") == id:
            articles[int(int(art.get("id", 1))) - 1] = article
            break


@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_article(id: str):
    for art in articles:
        if art.get("id") == id:
            articles.remove(art)
            break
