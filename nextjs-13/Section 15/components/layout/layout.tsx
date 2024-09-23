import MainHeader from '@/components/layout/main-header'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  )
}
