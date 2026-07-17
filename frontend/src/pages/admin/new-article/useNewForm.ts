
import { useState } from 'react'
import { createArticle } from '@/api/articles'
import { useNavigate } from 'react-router-dom'

export function useNewForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [content, setContent] = useState("")


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }


  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()


    try {
      const res = await createArticle(title, content)

      if (res) {
        console.log("published")
        navigate("/admin")
      }
    } catch (err) {
      console.log("error: ", err)
    }
  }

  return {
    title, setTitle, handleTitleChange,
    createdAt, setCreatedAt,
    content, setContent, handleContentChange,
    onSubmit
  }
}
