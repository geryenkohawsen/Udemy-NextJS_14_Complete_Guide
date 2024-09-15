import fs from 'fs/promises'
import path from 'path'

interface Props {
  products: {
    id: string
    title: string
  }[]
}

export default function HomePage(props: Props) {
  const { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  console.log('Regenerating... ')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData.toString())

  return {
    props: {
      products: data.products,
    },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 10 seconds.
    revalidate: 10,
  }
}
