export type Event = {
  id: string
  title: string
  description: string
  location: string
  date: string
  image: string
  isFeatured: boolean
}

export async function getAllEvents() {
  const response = await fetch(
    'https://vue-http-demo-cced6-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
  )
  const data = await response.json()

  const events = []
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    })
  }

  return events as Array<Event>
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured)
}
