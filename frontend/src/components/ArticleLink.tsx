import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

type ArticleLinkProps = {
  id: number;
  title: string;
  createdAt: string;
}

function ArticleLink({ id, title, createdAt }: ArticleLinkProps) {


  return (
    <Link to={`/article/${id}`} style={{ textDecoration: "none" }}>
      {title} - {formatDate(createdAt)}
    </Link>
  )
}

export default ArticleLink;
