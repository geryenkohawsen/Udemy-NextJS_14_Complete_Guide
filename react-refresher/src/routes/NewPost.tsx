import type { ActionFunction } from 'react-router';
import { Form, Link, redirect } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './NewPost.module.css';

function NewPost() {
  return (
    <Modal>
      <Form method='post' className={classes.form}>
        <p>
          <label htmlFor='body'>Text</label>
          <textarea id='body' name='body' required rows={3} />
        </p>
        <p>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' name='author' required />
        </p>
        <p className={classes.actions}>
          <Link to='/' type='button'>
            Cancel
          </Link>
          <button type='submit'>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Posting posts failed');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('ERROR', err.message);
    } else {
      console.error(
        'ERROR',
        'An unknown error occurred during posting new post data'
      );
    }
  }

  return redirect('/');
};
