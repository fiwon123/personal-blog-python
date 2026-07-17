import { useEffect, useState } from 'react'
import { deleteArticle, getArticles } from '@/api/articles'
import type { ArticleListItem } from '@/types/articles'
import ArticleLink from '@/components/ArticleLink'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<ArticleListItem[]>([])

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(error => console.log('error:', error))
  }, [])

  return (
    <div className='page'>
      <div className="header">
        <h1>Personal Blog</h1>
        <a onClick={() => navigate('/new')}>+ Add</a>
      </div>
      {
        articles.map((article) => (
          <div className="dashboard-container" key={article.id}>
            < ArticleLink
              id={article.id}
              title={article.title}
              createdAt={article.createdAt}
            />

            <div className="actions">
              <button onClick={() => navigate(`/edit/${article.id}`)}>Edit </button>
              <button onClick={() => {
                deleteArticle(article.id)
                setArticles((prev) => prev.filter((a) => a.id !== article.id));
              }}>Delete</button>
            </div>
          </div >

        ))
      }
    </div >
  )

}

export default Dashboard;
