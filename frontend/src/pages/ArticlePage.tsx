import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getSingleArticle } from '../api/articles';
import { formatDate } from '../utils/formatDate';
import './Article.css'

function Article() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  useEffect(() => {

    if (!id) {
      return
    }

    getSingleArticle(id)
      .then((article) => {

        console.log(article)
        setTitle(article.title)
        setContent(article.content)
        setCreatedAt(article.createdAt)
      }).catch(error => console.log('error: ', error));
  }, [id])




  return (
    <div className="page">
      <h1>{title}</h1>
      <h3 className="date">{formatDate(createdAt)}</h3>
      <div className="content-break">
        {content}
      </div>
    </div>
  )
}

export default Article;
