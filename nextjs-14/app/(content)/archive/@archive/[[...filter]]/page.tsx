import NewsList from '@/components/NewsList'
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news'
import Link from 'next/link'

interface Props {
  params: { filter: string[] | undefined }
}

export default function FilteredNewsPage({ params }: Props) {
  const filter = params.filter

  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1]

  let news
  let links = getAvailableNewsYears()

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(+selectedYear)
    links = getAvailableNewsMonths(+selectedYear) // make links to months if year is selected already
  } else if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(+selectedYear, +selectedMonth)
    links = [] // remove links if month is selected
  }

  let newsContent = <p>No news found for the selected period.</p>
  if (news && news?.length > 0) {
    newsContent = <NewsList news={news} />
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedYear && selectedMonth && !getAvailableNewsMonths(+selectedYear).includes(+selectedMonth))
  ) {
    throw new Error('Invalid filter.')
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              // If the selected year is provided, include the selected month in the URL, otherwise just the year
              const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  )
}
