import { useRouter } from 'next/router'

export default function BlogPostsPage() {
  const router = useRouter()

  console.log('router.pathname', router.pathname)
  console.log('router.query', router.query)

  return (
    <div>
      <h1>The Blog Posts Page</h1>
    </div>
  )
}
