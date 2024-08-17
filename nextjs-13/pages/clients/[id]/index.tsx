import { useRouter } from 'next/router'

export default function ClientsProjectsPage() {
  const router = useRouter()

  console.log('router.query', router.query)

  return (
    <div>
      <h1>The Clients Projects Page</h1>
    </div>
  )
}
