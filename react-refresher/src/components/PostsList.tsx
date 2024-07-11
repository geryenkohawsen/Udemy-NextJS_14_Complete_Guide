import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from './Modal';

interface PostsListProps {
  isPosting: boolean;
  onStopPosting: () => void;
}

function PostsList(props: PostsListProps) {
  // --------------------------------------
  // Dynamic Contents
  // --------------------------------------
  const modalContent = props.isPosting && (
    <Modal onClose={props.onStopPosting}>
      <NewPost onCancel={props.onStopPosting} />
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
