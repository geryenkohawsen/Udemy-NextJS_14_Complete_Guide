import type { DummyData } from '@/types/dummy'
import fs from 'fs/promises'
import type { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import path from 'path'

export const getStaticProps: GetStaticProps<DummyData> = async (context): Promise<GetStaticPropsResult<DummyData>> => {
  console.log('Regenerating... ')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData.toString()) as DummyData

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
        permanent: false,
      },
    }
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products: data.products,
    },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 10 seconds.
    revalidate: 10,
  }
}

export default function HomePage({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  )
}
