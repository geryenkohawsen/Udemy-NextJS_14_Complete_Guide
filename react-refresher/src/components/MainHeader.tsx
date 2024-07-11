import { MdPostAdd, MdMessage } from 'react-icons/md';
import classes from './MainHeader.module.css';

// Define the props interface
interface MainHeaderProps {
  onCreatePost: () => void; // Define the type for the onCreatePost prop
}

// Functional component with typed props
const MainHeader = (props: MainHeaderProps) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <button className={classes.button} onClick={props.onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
};

export default MainHeader;
