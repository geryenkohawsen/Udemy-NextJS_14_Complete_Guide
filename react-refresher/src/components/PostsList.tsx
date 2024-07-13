import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from './Modal';
import { useState } from 'react';
import { Post } from '../@types';

interface PostsListProps {
  isPosting: boolean;
  onStopPosting: () => void;
}

function PostsList(props: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  function addPostHandler(postData: Post) {
    //! When updating a state based on a current state, we need to pass a function to the setter
    //! This ensure React use the latest state for the state update
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  // --------------------------------------
  // Dynamic Contents
  // --------------------------------------
  const modalContent = props.isPosting && (
    <Modal onClose={props.onStopPosting}>
      <NewPost onCancel={props.onStopPosting} onAddPost={addPostHandler} />
    </Modal>
  );

  // --------------------------------------
  // Render
  // --------------------------------------
  return (
    <>
      {modalContent}
      <ul className={classes.posts}></ul>
    </>
  );
}

export default PostsList;
