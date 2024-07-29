import { DUMMY_NEWS } from '@/dummy-news'

interface Props {
  params: { slug: string }
}

export default function NewsDetailPage({ params }: Props) {
  const newsSlug = params.slug
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug)

  if (!newsItem) {
    return (
      <article className="news-article">
        <h1>News not found</h1>
      </article>
    )
  } else {
    return (
      <article className="news-article">
        <header>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
          <h1>{newsItem.title}</h1>
          <time dateTime={newsItem.date}>{newsItem.date}</time>
        </header>
        <p>{newsItem.content}</p>
      </article>
    )
  }
}
