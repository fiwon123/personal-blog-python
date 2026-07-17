import { useState } from 'react'
import { updateArticle } from '../../../api/articles'
import { useNavigate } from 'react-router-dom'

export function useEditForm() {
  const navigate = useNavigate()
  const [id, setID] = useState("")
  const [title, setTitle] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [content, setContent] = useState("")


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleCreatedAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedAt(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()


    try {
      await updateArticle(id, title, content)

      console.log("updated")
      navigate("/admin")
    } catch (err) {
      console.log("error: ", err)
    }
  }

  return {
    setID,
    title, setTitle, handleTitleChange,
    createdAt, setCreatedAt, handleCreatedAtChange,
    content, setContent, handleContentChange,
    onSubmit
  }
}
