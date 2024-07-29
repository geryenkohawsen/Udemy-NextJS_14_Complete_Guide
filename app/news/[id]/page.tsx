interface Props {
  params: { id: string }
}

export default function NewsDetailPage({ params }: Props) {
  const newsId = params.id

  return (
    <div>
      <h1>News Detail Page</h1>
      <p>News ID: {newsId}</p>
    </div>
  )
}
