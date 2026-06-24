import "./ModalWithForm.css";
import useModalClose from "../../hooks/useModalClose";

function ModalWithForm({ 
  title,
  name,
  buttonText = "Save",
  onClose,
  isOpen,
  children,
  onSubmit,
  secondaryButtonText,
  openSecondaryModal,
}) {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        ></button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <div>
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={openSecondaryModal}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}


export default ModalWithForm; 
