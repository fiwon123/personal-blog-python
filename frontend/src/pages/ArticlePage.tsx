import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'


function Article() {
  const { id } = useParams();
  const [content, setContent] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  useEffect(() => {
    axios.get(`/v1/articles/${id}`)
      .then(res => {
        const article = res.data

        setContent(article.content)
        setCreatedAt(article.createdAt)
      }).catch(err => {
        console.log("error: ", err)
      })
  }, [id])




  return (
    <div>
      <h1>Article</h1>
      <h3>{createdAt}</h3>
      <div>
        {content}
      </div>
    </div>
  )
}

export default Article;
