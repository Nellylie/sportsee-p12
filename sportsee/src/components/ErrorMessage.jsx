
// retourne la modale d'erreur, composant jsx
function ErrorMessageModal({ message }) {
  return (
    <div className="error-message">
      <div/>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}


export default ErrorMessageModal;