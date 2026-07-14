import ArticleLink from "../components/ArticleLink";
import { useEffect, useState } from 'react'
import axios from 'axios'

type Article = {
  id: string,
  title: string,
  createdAt: string
}

export function Home() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    axios.get('http://localhost:8000/articles')
      .then(res => {
        setArticles(res.data)
      }).catch(error => {
        console.log('error: ', error)
      })
  }, [])

  return (
    <div>
      <h1>Personal Blog</h1>
      {articles.map((article) => (
        < ArticleLink
          key={article.id}
          title={article.title}
          createdAt={article.createdAt}
        />))}
    </div>
  )
}

export default Home;
