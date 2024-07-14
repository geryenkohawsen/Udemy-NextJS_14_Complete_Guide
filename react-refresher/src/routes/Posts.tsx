import { Outlet } from 'react-router-dom';
import PostsList from '../components/PostsList';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export const loader = async () => {
  try {
    const response = await fetch('http://localhost:8080/posts');
    if (!response.ok) {
      throw new Error('Fetching posts failed');
    }

    const resData = await response.json();
    return resData.posts;
  } catch (err) {
    if (err instanceof Error) {
      console.error('ERROR', err.message);
    } else {
      console.error(
        'ERROR',
        'An unknown error occurred during fetching posts data'
      );
    }
  }
};
