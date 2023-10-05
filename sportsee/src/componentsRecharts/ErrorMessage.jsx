

function ErrorMessageModal({ message, onClose }) {
  return (
    <div className="error-message">
      <div onClick={onClose} />
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}


export default ErrorMessageModal;