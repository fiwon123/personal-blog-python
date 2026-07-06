from fastapi import APIRouter, status

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


@router.get("", status_code=status.HTTP_200_OK)
async def get_articles():
    return articles


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_article(article: dict[str, str]):
    articles.append(article)
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
