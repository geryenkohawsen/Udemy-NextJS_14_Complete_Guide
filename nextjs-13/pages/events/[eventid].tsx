import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import { getEventById } from '@/dummy-data'
import image from 'next/image'
import { useRouter } from 'next/router'

export default function EventDetailPage() {
  const router = useRouter()

  const eventId = router.query.eventid
  if (!eventId) {
    return <p>Invalid event ID</p>
  }

  const event = getEventById(eventId.toString())
  if (!event) {
    return <p>Event not found</p>
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={image.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}
