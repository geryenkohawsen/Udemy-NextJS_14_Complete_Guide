'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
export default function FilterError({ error, reset }: ErrorProps) {
  return (
    <div id="error">
      <h2>An error occured!</h2>
      <p>{error.message}</p>
    </div>
  )
}
