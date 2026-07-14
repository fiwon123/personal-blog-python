from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class CreateArticleRequest(BaseModel):
    title: str
    content: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "title",
                "content": "content",
            }
        }
    }


class UpdateArticleRequest(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "title",
                "content": "content",
            }
        }
    }


class ArticleListResponse(BaseModel):
    id: int
    title: str
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ArticleDetailResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
