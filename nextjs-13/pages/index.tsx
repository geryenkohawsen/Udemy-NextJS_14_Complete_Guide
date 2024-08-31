import EventList from '@/components/event-list'
import { getFeaturedEvents } from '../dummy-data'

export default function HomePage() {
  const featuredEvents = getFeaturedEvents()
  console.log('featuredEvents --> ', featuredEvents)

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}
