import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostsList.module.css';
import Modal from './Modal';

interface PostsListProps {
  isPosting: boolean;
  onStopPosting: () => void;
}

function PostsList(props: PostsListProps) {
  // --------------------------------------
  // State Declarations
  // --------------------------------------
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  // --------------------------------------
  // Functions
  // --------------------------------------
  function bodyChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredAuthor(event.target.value);
  }

  // --------------------------------------
  // Dynamic Contents
  // --------------------------------------
  const modalContent = props.isPosting && (
    <Modal onClose={props.onStopPosting}>
      <NewPost
        onBodyChange={bodyChangeHandler}
        onAuthorChange={authorChangeHandler}
        onCancel={props.onStopPosting}
      />
    </Modal>
  );

  // --------------------------------------
  // Render
  // --------------------------------------
  return (
    <>
      {modalContent}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author='Author 2' body='body 2' />
      </ul>
    </>
  );
}

export default PostsList;
