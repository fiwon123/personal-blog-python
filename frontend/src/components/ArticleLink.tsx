type ArticleLinkProps = {
  title: string;
  createdAt: string;
}

function ArticleLink({ title, createdAt }: ArticleLinkProps) {

  const date = new Date(createdAt)

  return (
    <div>{title} - {" "}
      {date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}</div>
  )
}

export default ArticleLink;
