export function GET(request: Request) {
  console.log(request)

  // Either return a JSON or string
  // return new Response.json()
  return new Response('Hello!')
}
