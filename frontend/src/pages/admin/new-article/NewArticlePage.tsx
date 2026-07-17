import './NewArticle.css'
import { useNewForm } from './useNewForm';
import { formatDate } from '@/utils/formatDate';

function NewArticle() {
  const today = new Date()
  const { title, handleTitleChange,
    content, handleContentChange,
    onSubmit
  } = useNewForm()



  return (
    <div>
      <h1>New Article</h1>
      <form onSubmit={onSubmit} className="container">
        <input type="text" name="title" value={title} placeholder="title" onChange={handleTitleChange} />
        <input type="text" name="created_at" value={formatDate(today.toISOString())} disabled={true} placeholder="publishing date" />
        <textarea name="content" rows={5} value={content} placeholder="content" onChange={handleContentChange}>
        </textarea>
        <button type="submit" >Publish</button>
      </form>
    </div >
  )
}

export default NewArticle;
