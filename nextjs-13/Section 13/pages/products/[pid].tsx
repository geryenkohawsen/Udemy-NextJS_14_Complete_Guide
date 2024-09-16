import type { DummyData, LoadedProduct } from '@/types/dummy'
import fs from 'fs/promises'
import type { GetStaticPaths, GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'
import path from 'path'

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData.toString()) as DummyData
  return data
}

export const getStaticProps = (async (context): Promise<GetStaticPropsResult<LoadedProduct>> => {
  const { params } = context

  if (!params) {
    return {
      notFound: true,
    }
  }

  const productId = params.pid

  const data = await getData()

  const product = data.products.find((product) => product.id === productId)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      loadedProduct: product,
    },
  }
}) satisfies GetStaticProps

export const getStaticPaths = (async () => {
  const data = await getData()
  const ids = data.products.map((product) => product.id)
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }))

  return {
    paths: pathsWithParams,
    // true or false or "blocking"
    // if fallback is true, it tells Next.js that some other params might be available and is a valid path.
    // However, it will only be generated during the request
    // Blocking will make it wait and only render the DOM after the request completes
    fallback: true,
  }
}) satisfies GetStaticPaths

export default function ProductDetailPage({ loadedProduct }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Need a fallback JSX if fallback is set to true
  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
}
