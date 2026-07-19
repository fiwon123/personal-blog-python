from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND

from ..schemas.articles import (
    ArticleDetailResponse,
    ArticleListResponse,
    CreateArticleRequest,
    UpdateArticleRequest,
)

from ..database.db import get_db
from ..repositories.article import ArticleRepository
from ..services.articles import ArticleService

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)


def get_article_service(db: Session = Depends(get_db)):
    repo = ArticleRepository(db)
    return ArticleService(repo)


@router.get(
    "",
    response_model=list[ArticleListResponse],
    status_code=status.HTTP_200_OK,
)
async def get_articles(service: ArticleService = Depends(get_article_service)):

    res = service.get_all()

    return res


@router.get(
    "/{id}",
    response_model=ArticleDetailResponse,
    status_code=status.HTTP_200_OK,
)
async def get_single_article(
    id: int,
    service: ArticleService = Depends(get_article_service),
):
    res = service.get_article_by_id(id)
    if res is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="article not found"
        )

    return ArticleDetailResponse.model_validate(res)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_article(
    request: CreateArticleRequest,
    service: ArticleService = Depends(get_article_service),
):
    article = service.create(request.title, request.content)

    if article is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="server error"
        )

    return article


@router.patch("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_article(
    id: int,
    request: UpdateArticleRequest,
    service: ArticleService = Depends(get_article_service),
):

    data = request.model_dump(exclude_unset=True)

    result = await service.update(id, data)

    if result is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                            detail="article not found")


@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_article(
    id: int,
    service: ArticleService = Depends(
        get_article_service,
    ),
):
    result = service.delete(id)

    if result is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                            detail="article not found")

    return result
