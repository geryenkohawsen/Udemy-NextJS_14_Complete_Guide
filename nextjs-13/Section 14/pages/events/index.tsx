import EventList from '@/components/events/event-list'
import EventsSearch from '@/components/events/events-search'
import type { Event } from '@/helpers/api-util'
import { getAllEvents } from '@/helpers/api-util'
import type { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

type StaticProps = {
  events: Event[]
}

export const getStaticProps = (async (context): Promise<GetStaticPropsResult<StaticProps>> => {
  const events = await getAllEvents()

  return {
    props: {
      events,
    },
    revalidate: 60, // Cache the data for every 1 minute (60 seconds)
  }
}) satisfies GetStaticProps

export default function AllEventsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const events = props.events

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
}
