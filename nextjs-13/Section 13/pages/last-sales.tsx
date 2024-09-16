import type { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type StaticProps = {
  sales: Sales
}

type Sales = {
  id: string
  username: string
  volume: string
}[]

export const getStaticProps = (async (context): Promise<GetStaticPropsResult<StaticProps>> => {
  const response = await fetch(
    'https://vue-http-demo-cced6-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
  )
  const data = await response.json()

  const transformedSales = []

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    })
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  }
}) satisfies GetStaticProps

export default function LastSalesPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sales, setSales] = useState<Sales>(props.sales)
  console.log('sales --> ', sales)

  const fetcher = async (url: string, init?: RequestInit): Promise<unknown> => {
    const response = await fetch(url, init)
    if (!response.ok) {
      throw new Error('Failed to fetch')
    }
    return response.json()
  }
  const { data, error } = useSWR(
    'https://vue-http-demo-cced6-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
    fetcher,
  )

  useEffect(() => {
    if (data) {
      const transformedSales = []
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }
      setSales(transformedSales)
    }
  }, [data])

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch('https://vue-http-demo-cced6-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedSales = []

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         })
  //       }

  //       setSales(transformedSales)
  //       setIsLoading(false)
  //     })
  // }, [])

  if (error) {
    return <p>No sales data found.</p>
  }

  if (!data && !sales) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  )
}
