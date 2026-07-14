type ArticleLinkProps = {
  title: string;
  createdAt: string;
}

function ArticleLink({ title, createdAt }: ArticleLinkProps) {


  return (
    <div>{title} -  {createdAt}</div>
  )
}

export default ArticleLink;
