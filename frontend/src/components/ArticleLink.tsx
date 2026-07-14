import { formatDate } from "../utils/formatDate";

type ArticleLinkProps = {
  title: string;
  createdAt: string;
}

function ArticleLink({ title, createdAt }: ArticleLinkProps) {


  return (
    <div>{title} - {" "}
      {formatDate(createdAt)}
    </div>
  )
}

export default ArticleLink;
