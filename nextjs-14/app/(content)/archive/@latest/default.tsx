import NewsList from '@/components/NewsList'
import { getLatestNews } from '@/lib/news'

export default function LatestNewsDefaultPage() {
  const latestNews = getLatestNews()

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  )
}
