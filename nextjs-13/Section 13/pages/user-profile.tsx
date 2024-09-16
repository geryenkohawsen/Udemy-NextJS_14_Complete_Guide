import type { User } from '@/types/dummy'
import type { GetServerSideProps, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = (async (context): Promise<GetServerSidePropsResult<User>> => {
  const { params, req, res } = context

  console.log('Server Side Log')

  return {
    props: {
      username: 'Max',
    },
  }
}) satisfies GetServerSideProps

export default function UserProfilePage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>{props.username}</h1>
}
