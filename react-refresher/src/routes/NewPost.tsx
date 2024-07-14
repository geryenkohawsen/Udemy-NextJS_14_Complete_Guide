import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './NewPost.module.css';
import { PostType } from '../@types';
import Modal from '../components/Modal';

interface NewPostProps {
  onAddPost: (postData: PostType) => void;
}

function NewPost(props: NewPostProps) {
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

  function submitHandler(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };
    console.log(postData);
    props.onAddPost(postData);
  }

  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor='body'>Text</label>
          <textarea id='body' required rows={3} onChange={bodyChangeHandler} />
        </p>
        <p>
          <label htmlFor='name'>Your name</label>
          <input
            type='text'
            id='name'
            required
            onChange={authorChangeHandler}
          />
        </p>
        <p className={classes.actions}>
          <Link to='/' type='button'>
            Cancel
          </Link>
          <button type='submit'>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
