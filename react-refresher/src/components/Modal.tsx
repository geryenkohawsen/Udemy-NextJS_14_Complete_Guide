import classes from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
}

function Modal(props: ModalProps) {
  return (
    <>
      <div className={classes.backdrop} />
      <dialog open className={classes.modal}>
        {props.children}
      </dialog>
    </>
  );
}

export default Modal;
