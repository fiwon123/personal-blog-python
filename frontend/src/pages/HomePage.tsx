import ArticleLink from "../components/ArticleLink";
import { useEffect, useState } from 'react'
import { getArticles } from "../api/articles";
import type { ArticleListItem } from "../types/articles";


export function Home() {
  const [articles, setArticles] = useState<ArticleListItem[]>([])

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(error => console.log('error:', error))
  }, [])

  return (
    <div>
      <h1>Personal Blog</h1>
      {articles.map((article) => (
        < ArticleLink
          key={article.id}
          id={article.id}
          title={article.title}
          createdAt={article.createdAt}
        />))}
    </div>
  )
}

export default Home;
