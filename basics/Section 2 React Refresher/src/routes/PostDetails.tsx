import { useLoaderData, Link, LoaderFunction } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';
import { PostType } from '../@types';

function PostDetails() {
  const post = useLoaderData() as PostType;

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to='..' className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch('http://localhost:8080/posts/' + params.id);
    if (!response.ok) {
      throw new Error('Fetching posts failed');
    }

    const resData = await response.json();
    return resData.post;
  } catch (err) {
    if (err instanceof Error) {
      console.error('ERROR', err.message);
    } else {
      console.error(
        'ERROR',
        'An unknown error occurred during fetching post data'
      );
    }
  }
};
