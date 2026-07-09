from sqlalchemy.orm import Session
from ..models.article import ArticleDB


class ArticleRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, id: int):
        article = self.db.query(ArticleDB).filter(ArticleDB.id == id).first()

        return article

    def get_all(self):
        articles = self.db.query(ArticleDB).all()

        return articles

    def create(self, title: str, content: str):
        article = ArticleDB(title=title, content=content)
        self.db.add(article)
        self.db.commit()
        self.db.refresh(article)

        return article

    def update(self, id: int, data: dict):
        article = self.get_by_id(id)

        if article is None:
            return None

        for key, value in data.items():
            setattr(article, key, value)

        self.db.commit()
        self.db.refresh(article)

        return article

    def delete(self, id: int):
        article = self.get_by_id(id)

        if article is None:
            return None

        self.db.delete(article)
        self.db.commit()

        return article
