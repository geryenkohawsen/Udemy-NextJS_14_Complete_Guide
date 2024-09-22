import EventList from '@/components/events/event-list'
import ResultsTitle from '@/components/events/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'
import { getFilteredEvents, type Event } from '@/helpers/api-util'
import type { GetServerSideProps, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

type ServerProps = {
  hasError?: boolean
  events?: Event[]
  date?: {
    year: number
    month: number
  }
}

export const getServerSideProps = (async (context): Promise<GetServerSidePropsResult<ServerProps>> => {
  const { params } = context

  const filterData = params?.slug

  if (!filterData || !filterData[0] || !filterData[1]) {
    return {
      notFound: true,
    }
  }

  const filteredYear = +filterData[0]
  const filteredMonth = +filterData[1]

  // Check if the URL cannot be made into a number
  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  if (!filteredEvents.length) {
    return {
      props: {
        hasError: true,
      },
    }
  }

  return {
    props: {
      events: filteredEvents,
      date: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  }
}) satisfies GetServerSideProps

export default function FilteredEventsPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (props.hasError || !props.events || !props.date) {
    return (
      <>
        <ErrorAlert>No events found for the chosen filter!</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(props.date.year, props.date.month - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={props.events} />
    </>
  )
}
