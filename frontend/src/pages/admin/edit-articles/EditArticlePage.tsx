import { useEditForm } from "./useEditForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../../../api/articles";
import { formatDate } from "../../../utils/formatDate";
import "./EditArticle.css"

function EditArticle() {
  const { id } = useParams<{ id: string }>()
  const {
    setID,
    title, setTitle, handleTitleChange,
    createdAt, setCreatedAt, handleCreatedAtChange,
    content, setContent, handleContentChange,
    errors,
    onSubmit
  } = useEditForm()

  useEffect(() => {

    if (!id) {
      return
    }

    const fetchArticle = async (id: string) => {

      try {
        const article = await getSingleArticle(id)

        setID(id)
        setTitle(article.title)
        setCreatedAt(article.createdAt)
        setContent(article.content)
      } catch (err) {
        console.log("error", err)
      }
    }

    fetchArticle(id)
  }, [id, setContent, setID, setTitle, setCreatedAt])

  return (
    <div className="page">
      <h1>Update Article</h1>
      <form onSubmit={onSubmit} className="container">
        <input className={errors.title ? "inputError" : ""} type="text" name="title" value={title} placeholder="title" onChange={handleTitleChange} />
        {errors.title ? <p className="error">{errors.title}</p> : null}
        <input type="text" name="created_at" value={formatDate(createdAt)} disabled={true} placeholder="publishing date" onChange={handleCreatedAtChange} />
        <textarea className={errors.content ? "inputError" : ""} name="content" rows={15} value={content} placeholder="content" onChange={handleContentChange}>
        </textarea>
        {errors.content ? <p className="error">{errors.content}</p> : null}
        <button type="submit" >
          Update
        </button>
      </form>
    </div >
  )
}

export default EditArticle;
