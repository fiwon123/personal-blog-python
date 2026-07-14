import ArticleLink from "../components/ArticleLink";
import { useEffect, useState } from 'react'
import axios from 'axios'

type Article = {
  id: string,
  title: string,
  created_at: string
}

export function Home() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    axios.get('/v1/articles')
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
          createdAt={article.created_at}
        />))}
    </div>
  )
}

export default Home;
