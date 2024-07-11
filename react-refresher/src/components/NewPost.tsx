import { useState } from 'react';
import classes from './NewPost.module.css';

interface NewPostProps {
  onCancel: () => void;
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
    const postDate = {
      body: enteredBody,
      author: enteredAuthor,
    };
    console.log(postDate);
    props.onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor='body'>Text</label>
        <textarea id='body' required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' required onChange={authorChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button type='submit'>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
