from ..repositories.article import ArticleRepository


class ArticleService:
    def __init__(self, repo: ArticleRepository):
        self.repo = repo

    def create(self, title: str, content: str):
        return self.repo.create(title, content)

    def update(self, id: int, data: dict):
        return self.repo.update(id, data)

    def delete(self, id: int):
        return self.repo.delete(
            id,
        )
