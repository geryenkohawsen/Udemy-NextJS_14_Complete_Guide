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
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  console.log(jsonData)
  const data = JSON.parse(jsonData)

  return {
    props: {
      products: data.products,
    },
  }
}
