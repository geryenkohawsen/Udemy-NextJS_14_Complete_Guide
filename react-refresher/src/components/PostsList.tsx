import Post from './Post';
import styles from './PostsList.module.css';

function PostsList() {
  return (
    <ul className={styles.posts}>
      <Post author='Author 1' body='body 1' />
      <Post author='Author 2' body='body 2' />
    </ul>
  );
}

export default PostsList;
