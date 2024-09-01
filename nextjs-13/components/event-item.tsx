import Link from 'next/link'
import classes from './event-item.module.css'

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
    <li className={classes.item}>
      <img src={'/' + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time dateTime={humanReadableDate}>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  )
}
