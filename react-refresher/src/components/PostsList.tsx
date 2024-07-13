import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import type { PostType } from '../@types';
import Post from './Post';

interface PostsListProps {
  isPosting: boolean;
  onStopPosting: () => void;
}

function PostsList(props: PostsListProps) {
  const [posts, setPosts] = useState<PostType[]>([]);

  //* useEffect will only run the function based on the dependencies variables (2nd argument)
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:8080/posts');
      const resData = await response.json();
      setPosts(resData.posts);
    }

    fetchPosts();
  }, []);

  function addPostHandler(postData: PostType) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    //* When updating a state based on a current state, we need to pass a function to the setter
    //* This ensure React use the latest state for the state update
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

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
      {posts.length > 0 ? (
        <ul className={classes.posts}>
          {posts.map((post, idx) => (
            <Post key={idx} author={post.author} body={post.body} />
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
