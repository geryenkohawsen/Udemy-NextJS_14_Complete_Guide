import type { DummyData, LoadedProduct } from '@/types/dummy'
import fs from 'fs/promises'
import type { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'
import path from 'path'

export const getStaticProps: GetStaticProps<LoadedProduct> = async (
  context,
): Promise<GetStaticPropsResult<LoadedProduct>> => {
  const { params } = context

  if (!params) {
    return {
      notFound: true,
    }
  }

  const productId = params.pid

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData.toString()) as DummyData

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
}

export default function ProductDetailPage({ loadedProduct }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
}
