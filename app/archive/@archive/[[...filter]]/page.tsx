import { getAvailableNewsYears } from '@/lib/news'
import Link from 'next/link'

interface Props {
  params: { filter: string[] | undefined }
}

export default function FilteredNewsPage({ params }: Props) {
  const newsYear = params.filter
  console.log('newsYear --> ', newsYear)
  // const news = getNewsForYear(newsYear)

  const links = getAvailableNewsYears()

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link}>
              <Link href={`/archive/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    // <NewsList news={news} />
  )
}
