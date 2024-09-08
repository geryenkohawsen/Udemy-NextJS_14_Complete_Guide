import { getFilteredEvents } from '@/dummy-data'
import { useRouter } from 'next/router'

export default function FilteredEventsPage() {
  const router = useRouter()
  const filterData = router.query.slug

  if (!filterData) {
    return <p className="center">Loading...</p>
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
    return <p className="center">Invalid filter...</p>
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No events found for the chosen filter!</p>
  }

  return (
    <div>
      <h1>Filtered Events</h1>
    </div>
  )
}
