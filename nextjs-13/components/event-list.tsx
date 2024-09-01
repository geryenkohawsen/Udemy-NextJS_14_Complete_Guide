import EventItem from '@/components/event-item'
import type { Event } from '@/dummy-data'
import classes from './event-list.module.css'

interface Props {
  items: Array<Event>
}
export default function EventList({ items }: Props) {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  )
}
