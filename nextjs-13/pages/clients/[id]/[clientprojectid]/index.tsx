import { useRouter } from 'next/router'

export default function SelectedClientsProjectsPage() {
  const router = useRouter()

  console.log('router.query', router.query)

  return (
    <div>
      <h1>The Selected Clients Projects Page</h1>
    </div>
  )
}
