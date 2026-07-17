
import { useState } from 'react'
import { createArticle } from '@/api/articles'
import { useNavigate } from 'react-router-dom'

export function useNewForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState({ title: "", content: "" })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const newTitle = e.target.value
    const newErrors = { ...errors }

    if (newTitle == "") {
      newErrors.title = "Title is empty"
    } else {
      newErrors.title = ""
    }

    setErrors(newErrors)
    setTitle(newTitle)
  }


  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    const newErrors = { ...errors }
    if (newContent == "") {
      newErrors.content = "Content is empty"
    } else {
      newErrors.content = ""
    }

    setErrors(newErrors)
    setContent(newContent)
  }

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()


    const newErrors = { ...errors }
    if (title == "") {
      newErrors.title = "Title is empty"
    } else {
      newErrors.title = ""
    }

    if (content == "") {
      newErrors.content = "Content is empty"
    } else {
      newErrors.content = ""
    }

    if (newErrors.title != "" || newErrors.content != "") {
      setErrors(newErrors)
      return
    }

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
    errors,
    createdAt, setCreatedAt,
    content, setContent, handleContentChange,
    onSubmit
  }
}
