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
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }],
    },
  }
}
