'use client'

import NewsList from '@/components/NewsList'
import type { News } from '@/dummy-news'
import { useEffect, useState } from 'react'

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [news, setNews] = useState<News>()

  useEffect(() => {
    // Fetch news data when the page loads
    async function fetchNews() {
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/news')

      if (!response.ok) {
        setError('Failed to fetch news data')
        setIsLoading(false)
      }

      const news = await response.json()
      setIsLoading(false)
      setNews(news)
    }

    fetchNews()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  let newsContent
  if (news) {
    newsContent = <NewsList news={news} />
  }

  return (
    <div>
      <h1>News Page</h1>
      {newsContent}
    </div>
  )
}
