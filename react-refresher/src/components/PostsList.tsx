import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostsList.module.css';
import Modal from './Modal';

function PostsList() {
  // --------------------------------------
  // State Declarations
  // --------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  // --------------------------------------
  // Functions
  // --------------------------------------
  function hideModalHandler() {
    setIsModalVisible(false);
  }

  // Handler for body change in NewPost component
  function bodyChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEnteredBody(event.target.value);
  }

  // Handler for author change in NewPost component
  function authorChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredAuthor(event.target.value);
  }

  // --------------------------------------
  // Dynamic Contents
  // --------------------------------------
  const modalContent = isModalVisible && (
    <Modal onClose={hideModalHandler}>
      <NewPost
        onBodyChange={bodyChangeHandler}
        onAuthorChange={authorChangeHandler}
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
