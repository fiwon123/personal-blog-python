import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getSingleArticle } from '../api/articles';
import { formatDate } from '../utils/formatDate';
function Article() {
  const { id } = useParams();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  useEffect(() => {

    getSingleArticle(Number(id))
      .then((article) => {

        console.log(article)
        setTitle(article.title)
        setContent(article.content)
        setCreatedAt(article.createdAt)
      }).catch(error => console.log('error: ', error));
  }, [id])




  return (
    <div>
      <h1>{title}</h1>
      <h3>{formatDate(createdAt)}</h3>
      <div>
        {content}
      </div>
    </div>
  )
}

export default Article;
