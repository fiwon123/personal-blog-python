import './NewArticle.css'
import { useNewForm } from './useNewForm';
import { formatDate } from '@/utils/formatDate';

function NewArticle() {
  const today = new Date()
  const { title, handleTitleChange,
    content, handleContentChange,
    errors,
    onSubmit
  } = useNewForm()



  return (
    <div className="page">
      <h1>New Article</h1>
      <form onSubmit={onSubmit} className="container">
        <input type="text" className={errors.title ? "inputError" : ""} name="title" value={title} placeholder="title" onChange={handleTitleChange} />
        {errors.title ? <p className="error">{errors.title}</p> : null}
        <input type="text" name="created_at" value={formatDate(today.toISOString())} disabled={true} placeholder="publishing date" />
        <textarea className={errors.content ? "inputError" : ""} name="content" rows={15} value={content} placeholder="content" onChange={handleContentChange}>
        </textarea>
        {errors.content ? <p className="error">{errors.content}</p> : null}
        <button type="submit" >Publish</button>
      </form>
    </div >
  )
}

export default NewArticle;
