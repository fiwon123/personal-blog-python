import { useState } from 'react'
import { updateArticle } from '../../../api/articles'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export function useEditForm() {
  const navigate = useNavigate()
  const [id, setID] = useState("")
  const [title, setTitle] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState({ title: "", content: "", server: "" })


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

  const handleCreatedAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedAt(e.target.value)
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
      await updateArticle(id, title, content)


      console.log("updated")
      navigate("/admin")
    } catch (err: unknown) {
      console.log("error: ", err)


      if (axios.isAxiosError(err)) {
        newErrors.server = err.response?.data?.detail || "Something went wrong";
      } else {
        newErrors.server = "Something went wrong";
      }

      setErrors(newErrors)
    }
  }

  return {
    setID,
    title, setTitle, handleTitleChange,
    createdAt, setCreatedAt, handleCreatedAtChange,
    content, setContent, handleContentChange,
    errors,
    onSubmit
  }
}
