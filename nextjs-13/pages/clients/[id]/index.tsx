import { useRouter } from 'next/router'

export default function ClientsProjectsPage() {
  const router = useRouter()

  console.log('router.query', router.query)

  function loadProjectHandler() {
    // router.push('/clients/max/project-a')
    router.push({
      pathname: '/clients/[id]/[cilentprojectid]',
      query: { id: 'max', cilentprojectid: 'projecta' },
    })
  }

  return (
    <div>
      <h1>The Clients Projects Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  )
}
