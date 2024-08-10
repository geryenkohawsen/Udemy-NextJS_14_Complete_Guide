interface Props {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function NewsDetailLayout({ children, modal }: Props) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
