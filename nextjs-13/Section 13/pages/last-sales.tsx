import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Sales = {
  id: string
  username: string
  volume: string
}[]

export default function LastSalesPage() {
  const [sales, setSales] = useState<Sales>()
  const [isLoading, setIsLoading] = useState(false)

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

  if (!data || !sales) {
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
