import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import ErrorAlert from '@/components/ui/error-alert'
import { getEventById } from '@/dummy-data'
import { useRouter } from 'next/router'

export default function EventDetailPage() {
  const router = useRouter()

  const eventId = router.query.eventid
  if (!eventId) {
    return <ErrorAlert>Invalid event ID</ErrorAlert>
  }

  const event = getEventById(eventId.toString())
  if (!event) {
    return <ErrorAlert>Event not found</ErrorAlert>
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}