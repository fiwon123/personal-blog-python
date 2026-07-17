import { useEffect, useState } from 'react'
import { getArticles } from '@/api/articles'
import type { ArticleListItem } from '@/types/articles'
import ArticleLink from '@/components/ArticleLink'
import './Dashboard.css'

function Dashboard() {

  const [articles, setArticles] = useState<ArticleListItem[]>([])

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(error => console.log('error:', error))
  }, [])

  return (
    <div>
      <div className="header">
        <h1>Personal Blog</h1>
        <button>+ Add</button>
      </div>
      {articles.map((article) => (
        <div className="dashboard-container" key={article.id}>
          < ArticleLink
            title={article.title}
            createdAt={article.createdAt}
          />

          <div className="actions">
            <button >Edit </button>
            <button >Delete</button>
          </div>
        </div>

      ))}
    </div>
  )

}

export default Dashboard;
