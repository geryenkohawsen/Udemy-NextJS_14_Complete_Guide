import { useEffect, useState } from 'react'

type Sales = {
  id: string
  username: string
  volume: string
}[]

export default function LastSalesPage() {
  const [sales, setSales] = useState<Sales>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://vue-http-demo-cced6-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = []

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          })
        }

        setSales(transformedSales)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!sales?.length) {
    return <p>No sales data found.</p>
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
