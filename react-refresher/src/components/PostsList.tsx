import classes from './PostsList.module.css';
import { useLoaderData } from 'react-router-dom';
import type { PostType } from '../@types';
import Post from './Post';

function PostsList() {
  const posts = useLoaderData() as PostType[];

  const addPostHandler = async (postData: PostType) => {
    try {
      await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error('Adding post failed', err.message);
      } else {
        console.error('Adding post failed', 'An unknown error occurred');
      }
    }
  };

  // --------------------------------------
  // Render
  // --------------------------------------
  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, idx) => (
            <Post key={post.body + idx} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
