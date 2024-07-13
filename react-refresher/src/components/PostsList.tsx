import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from './Modal';
import { useCallback, useEffect, useState } from 'react';
import type { PostType } from '../@types';
import Post from './Post';

interface PostsListProps {
  isPosting: boolean;
  onStopPosting: () => void;
}

function PostsList(props: PostsListProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //* useEffect will only run the function based on the dependencies variables (2nd argument)
  const fetchPosts = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/posts');
      if (!response.ok) {
        throw new Error('Fetching posts failed');
      }
      const resData = await response.json();
      setPosts(resData.posts ?? []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsFetching(false);
    }
  }, []); // No dependencies, so it's only created once

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // Runs useEffect when fetchPosts is (re)created

  const addPostHandler = async (postData: PostType) => {
    try {
      await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      //* When updating a state based on a current state, we need to pass a function to the setter
      //* This ensure React use the latest state for the state update
      setPosts((existingPosts) => [postData, ...existingPosts]);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Adding post failed', err.message);
      } else {
        console.error('Adding post failed', 'An unknown error occurred');
      }
    }
  };

  // // --------------------------------------
  // // Dynamic Contents
  // // --------------------------------------
  // const modalContent = props.isPosting && (
  //   <Modal onClose={props.onStopPosting}>
  //     <NewPost onCancel={props.onStopPosting} onAddPost={addPostHandler} />
  //   </Modal>
  // );

  // --------------------------------------
  // Render
  // --------------------------------------
  return (
    <>
      {props.isPosting && (
        <Modal onClose={props.onStopPosting}>
          <NewPost onCancel={props.onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {isFetching && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading posts...</p>
        </div>
      )}
      {!isFetching && error && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>{error}</p>
        </div>
      )}
      {!isFetching && !error && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, idx) => (
            <Post key={post.body + idx} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && !error && posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
