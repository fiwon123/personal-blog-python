import ArticleLink from "../components/ArticleLink";
import { useEffect, useState } from 'react'
import { getArticles } from "../api/articles";
import type { ArticleListItem } from "../types/articles";
import './Home.css'

export function Home() {
  const [articles, setArticles] = useState<ArticleListItem[]>([])

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(error => console.log('error:', error))
  }, [])

  return (
    <div className="page">
      <h1 >Personal Blog</h1>
      <div className="home-container" >
        {articles.map((article) => (
          < ArticleLink
            key={article.id}
            id={article.id}
            title={article.title}
            createdAt={article.createdAt}
          />))}
      </div>
    </div >
  )
}

export default Home;
