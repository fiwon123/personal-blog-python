from ..repositories.article import ArticleRepository


class ArticleService:
    def __init__(self, repo: ArticleRepository):
        self.repo = repo

    def create_article(self, title: str, content: str):
        return self.repo.create(title, content)

    def update_article(self, id: int, data: dict):
        return self.repo.update(id, data)
