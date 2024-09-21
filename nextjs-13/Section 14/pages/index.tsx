import EventList from '@/components/events/event-list'
import type { Event } from '@/helpers/api-util'
import { getFeaturedEvents } from '@/helpers/api-util'
import type { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'

type StaticProps = {
  events: Array<Event>
}

export const getStaticProps = (async (context): Promise<GetStaticPropsResult<StaticProps>> => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 10 seconds.
    revalidate: 10,
  }
}) satisfies GetStaticProps

export default function HomePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  )
}
