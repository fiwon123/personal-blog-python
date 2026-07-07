from ..database import Base
from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    func,
)


class Article(Base):
    __table__name = "articles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    update_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        server_onupdate=func.now(),
        nullable=False,
    )
    create_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
