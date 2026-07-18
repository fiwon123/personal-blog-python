import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import './ArticleLink.css'

type ArticleLinkProps = {
  id: number;
  title: string;
  createdAt: string;
}

function ArticleLink({ id, title, createdAt }: ArticleLinkProps) {


  return (
    <div className="format-date">
      <Link to={`/article/${id}`} style={{ textDecoration: "none" }}>
        {title}
      </Link>
      {createdAt != "" ? <div>{formatDate(createdAt)}</div> : null}
    </div>
  )
}

export default ArticleLink;
