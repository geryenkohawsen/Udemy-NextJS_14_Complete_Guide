import NewsList from '@/components/NewsList'
import { getNewsForYear } from '@/lib/news'

interface Props {
  params: { year: string }
}

export default function FilteredNewsPage({ params }: Props) {
  const newsYear = params.year
  const news = getNewsForYear(newsYear)

  return <NewsList news={news} />
}
