import { Link } from 'react-router-dom';
import classes from './Post.module.css';

interface PostProps {
  id: string; // The unique identifier of the post
  author: string; // The author of the post
  body: string; // The body content of the post
}

function Post(props: PostProps) {
  return (
    <li className={classes.post}>
      <Link to={props.id}>
        <p className={classes.author}>{props.author}</p>
        <p className={classes.text}>{props.body}</p>
      </Link>
    </li>
  );
}

export default Post;
