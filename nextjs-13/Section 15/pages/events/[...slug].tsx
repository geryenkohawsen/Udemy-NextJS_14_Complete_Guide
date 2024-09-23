import EventList from '@/components/events/event-list'
import ResultsTitle from '@/components/events/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'
import { type Event } from '@/helpers/api-util'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

// type ServerProps = {
//   hasError?: boolean
//   events?: Event[]
//   date?: {
//     year: number
//     month: number
//   }
// }

// export const getServerSideProps = (async (context): Promise<GetServerSidePropsResult<ServerProps>> => {
//   const { params } = context

//   const filterData = params?.slug

//   if (!filterData || !filterData[0] || !filterData[1]) {
//     return {
//       notFound: true,
//     }
//   }

//   const filteredYear = +filterData[0]
//   const filteredMonth = +filterData[1]

//   // Check if the URL cannot be made into a number
//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2021 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // },
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   })

//   if (!filteredEvents.length) {
//     return {
//       props: {
//         hasError: true,
//       },
//     }
//   }

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: filteredYear,
//         month: filteredMonth,
//       },
//     },
//   }
// }) satisfies GetServerSideProps

const fetcher = async (url: string, init?: RequestInit): Promise<unknown> => {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }
  return response.json()
}

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>()
  const router = useRouter()
  const filterData = router.query.slug

  const { data, error } = useSWR(
    'https://vue-http-demo-cced6-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
    fetcher,
  )
  console.log('data --> ', data)

  useEffect(() => {
    if (data) {
      const events = []
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }
      console.log('events --> ', events)

      setLoadedEvents(events)
    }
  }, [data])

  if (!loadedEvents) {
    return <p>Loading...</p>
  }

  if (!filterData || !filterData[0] || !filterData[1]) {
    return (
      <>
        <ErrorAlert>Invalid Filter!</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredYear = +filterData[0]
  const filteredMonth = +filterData[1]

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>Invalid Filter!</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === filteredYear && eventDate.getMonth() === filteredMonth - 1
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>No events found!</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(filteredYear, filteredMonth - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}
