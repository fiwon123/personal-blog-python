import type { ArticleDetail, ArticleListItem } from '../types/articles';
import { api } from '../contexts/useApi'

type ApiArticle = {
  id: number;
  title: string;
  created_at: string;
}

export async function getArticles(): Promise<ArticleListItem[]> {
  const res = await api.get('/v1/articles');
  return res.data.map((article: ApiArticle) => ({
    id: article.id,
    title: article.title,
    createdAt: article.created_at,
  }))
}

export async function getSingleArticle(id: string): Promise<ArticleDetail> {
  const res = await api.get(`/v1/articles/${id}`);

  const article = res.data

  return {
    id: article.id,
    title: article.title,
    content: article.content,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
  }
}

export async function createArticle(title: string, content: string): Promise<boolean> {
  const res = await api.post("/v1/articles", { title, content })

  return res.data
}

export async function updateArticle(id: string, title: string, content: string): Promise<boolean> {
  const res = await api.patch(`/v1/articles/${id}`, { title, content })

  return res.data
}

export async function deleteArticle(id: number): Promise<boolean> {
  const res = await api.delete(`/v1/articles/${id}`)

  return res.data
}
