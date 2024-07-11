import classes from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void; // Function to close the modal when clicked outside
}

function Modal(props: ModalProps) {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose} />
      <dialog open className={classes.modal}>
        {props.children}
      </dialog>
    </>
  );
}

export default Modal;
