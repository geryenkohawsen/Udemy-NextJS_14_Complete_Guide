import AddressIcon from '@/components/icons/address-icon'
import ArrowRightIcon from '@/components/icons/arrow-right-icon'
import DateIcon from '@/components/icons/date-icon'
import Button from '@/components/ui/button'
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
        <div>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time dateTime={humanReadableDate}>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            Explore Event
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}
