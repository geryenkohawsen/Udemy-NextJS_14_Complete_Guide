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

export async function loader() {
  try {
    const response = await fetch('http://localhost:8080/posts');
    if (!response.ok) {
      throw new Error('Fetching posts failed');
    }

    const resData = await response.json();
    return resData.posts;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Adding post failed', err.message);
    } else {
      console.error('Adding post failed', 'An unknown error occurred');
    }
  }
}
