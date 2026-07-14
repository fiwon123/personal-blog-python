export type ArticleListItem = {
  id: number;
  title: string;
  createdAt: string;
}

export type ArticleDetail = ArticleListItem & {
  content: string;
  updatedAt?: string;
}
