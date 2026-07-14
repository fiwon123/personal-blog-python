from ..repositories.article import ArticleRepository
from ..schemas.articles import ArticleResponse


class ArticleService:
    def __init__(self, repo: ArticleRepository):
        self.repo = repo

    def get_all(self):

        articles = self.repo.get_all()

        result = []
        for item in articles:
            result.append(ArticleResponse.model_validate(item))

        return result

    def create(self, title: str, content: str):
        return self.repo.create(title, content)

    def update(self, id: int, data: dict):
        return self.repo.update(id, data)

    def delete(self, id: int):
        return self.repo.delete(
            id,
        )
