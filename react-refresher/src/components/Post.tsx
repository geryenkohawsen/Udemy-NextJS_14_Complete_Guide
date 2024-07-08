import classes from './Post.module.css';

interface PostProps {
  author: string; // The author of the post
  body: string; // The body content of the post
}

function Post({ author, body }: PostProps) {
  return (
    <li className={classes.post}>
      <p className={classes.author}>{author}</p>
      <p className={classes.text}>{body}</p>
    </li>
  );
}

export default Post;
