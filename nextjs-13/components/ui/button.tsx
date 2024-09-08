import Link from 'next/link'
import type { ReactNode } from 'react'
import classes from './button.module.css'

interface Props {
  children: ReactNode
  link?: string
  onClick?: () => void
}
export default function Button({ children, link, onClick }: Props) {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  )
}
