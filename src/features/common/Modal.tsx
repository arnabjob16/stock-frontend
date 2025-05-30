interface ModalProps {
  title: String;
  content: React.ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  onClose
}) => {

  return (
      <div className={`modal fade show d-block`} tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
