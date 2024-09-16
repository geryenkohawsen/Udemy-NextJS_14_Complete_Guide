import type { User } from '@/types/dummy'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps<User> = async (context) => {
  const { params, req, res } = context

  console.log('Server Side Log')

  return {
    props: {
      username: 'Max',
    },
  }
}

export default function UserProfilePage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>{props.username}</h1>
}
