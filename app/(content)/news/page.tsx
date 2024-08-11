import NewsList from '@/components/NewsList'

export default async function NewsPage() {
  const response = await fetch('http://localhost:8080/news')
  const news = await response.json()

  return (
    <div>
      <h1>News Page</h1>
      <NewsList news={news} />
    </div>
  )
}
