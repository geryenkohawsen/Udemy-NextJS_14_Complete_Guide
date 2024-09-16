import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

type UserIdPage = {
  id: string
}   

export const getServerSideProps: GetServerSideProps<UserIdPage> = async (context) => {
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
}

export default function UserIdPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>{props.id}</h1>
}
