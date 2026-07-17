import { useEditForm } from "./useEditForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../../../api/articles";
import { formatDate } from "../../../utils/formatDate";

function EditArticle() {
  const { id } = useParams<{ id: string }>()
  const {
    setID,
    title, setTitle, handleTitleChange,
    createdAt, setCreatedAt, handleCreatedAtChange,
    content, setContent, handleContentChange,
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
        <input type="text" name="title" value={title} placeholder="title" onChange={handleTitleChange} />
        <input type="text" name="created_at" value={formatDate(createdAt)} disabled={true} placeholder="publishing date" onChange={handleCreatedAtChange} />
        <textarea name="content" rows={5} value={content} placeholder="content" onChange={handleContentChange}>
        </textarea>
        <button type="submit" >
          Update
        </button>
      </form>
    </div >
  )
}

export default EditArticle;
