import type { GetServerSideProps, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

type UserIdPage = {
  id: string
}

export const getServerSideProps = (async (context): Promise<GetServerSidePropsResult<UserIdPage>> => {
  const { params } = context
  if (!params) {
    return {
      notFound: true,
    }
  }

  const userId = params.uid
  return {
    props: {
      id: 'userid-' + userId,
    },
  }
}) satisfies GetServerSideProps

export default function UserIdPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>{props.id}</h1>
}
