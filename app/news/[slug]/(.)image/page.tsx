import { DUMMY_NEWS } from '@/dummy-news'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function InterceptedImagePage({ params }: Props) {
  const newsItemSlug = params.slug
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsItemSlug)

  if (!newsItem) {
    notFound()
  }

  return (
    <>
      <h2>INTERCEPTED!</h2>
      <div className="fullscreen-image">
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      </div>
    </>
  )
}
