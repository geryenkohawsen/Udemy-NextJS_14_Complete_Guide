import EventItem from '@/components/event-item'
import type { Event } from '@/dummy-data'

interface Props {
  items: Array<Event>
}
export default function EventList({ items }: Props) {
  return (
    <ul>
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
