import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import type { Event } from '@/helpers/api-util'
import { getEventById, getFeaturedEvents } from '@/helpers/api-util'
import type { GetStaticPaths, GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'

type StaticProps = {
  selectedEvent: Event
}

export const getStaticProps = (async (context): Promise<GetStaticPropsResult<StaticProps>> => {
  console.log('context --> ', context)
  const eventId = context.params?.eventId
  if (!eventId) {
    return {
      notFound: true,
    }
  }

  const event = await getEventById(eventId.toString())
  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      selectedEvent: event,
    },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 30 seconds.
    revalidate: 30,
  }
}) satisfies GetStaticProps

export const getStaticPaths = (async () => {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))

  return {
    paths,
    fallback: 'blocking', // Show 404 error page when a request with a paths that is not defined in the paths const
  }
}) satisfies GetStaticPaths

export default function EventDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const event = props.selectedEvent
  if (!event) {
    return <div className="center">Loading...</div>
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
