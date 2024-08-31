import type { Event } from '@/dummy-data'

interface Props {
  items: Array<Event>
}
export default function EventList({ items }: Props) {
  return (
    <ul>
      {items.map((event) => (
        <EventItem />
      ))}
    </ul>
  )
}
