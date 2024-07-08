import styles from './Post.module.css';

interface PostProps {
  author: string; // The author of the post
  body: string; // The body content of the post
}

function Post({ author, body }: PostProps) {
  return (
    <li className={styles.post}>
      <p className={styles.author}>{author}</p>
      <p className={styles.text}>{body}</p>
    </li>
  );
}

export default Post;
