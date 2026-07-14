import axios from 'axios';
import type { ArticleDetail, ArticleListItem } from '../types/articles';

type ApiArticle = {
  id: number;
  title: string;
  created_at: string;
}

export async function getArticles(): Promise<ArticleListItem[]> {
  const res = await axios.get('/v1/articles');
  return res.data.map((article: ApiArticle) => ({
    id: article.id,
    title: article.title,
    createdAt: article.created_at,
  }))
}

export async function getSingleArticle(id: number): Promise<ArticleDetail> {
  const res = await axios.get(`/v1/articles/${id}`);

  const article = res.data

  return {
    id: article.id,
    title: article.title,
    content: article.content,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
  }
}
