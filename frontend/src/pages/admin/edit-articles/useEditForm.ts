import { useState } from 'react'
import { updateArticle } from '../../../api/articles'

export function useEditForm() {
  const [id] = useState("")
  const [title, setTitle] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [content, setContent] = useState("")


  const handleTItleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const res = await updateArticle(id, title, content)

      if (res) {
        console.log("updated")
      }
    } catch (err) {
      console.log("error: ", err)
    }
  }

  return {
    title, setTitle, handleTItleChange,
    createdAt, setCreatedAt, handleCreatedAtChange,
    content, setContent, handleContentChange,
    onSubmit
  }
}
