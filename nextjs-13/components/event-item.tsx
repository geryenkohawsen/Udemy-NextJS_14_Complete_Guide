import Link from 'next/link'

interface Props {
  title: string
  image: string
  date: string
  location: string
  id: string
}
export default function EventItem({ title, image, date, location, id }: Props) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-JA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`

  return (
    <li>
      <img src={'/' + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <time dateTime={humanReadableDate}>{humanReadableDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  )
}
