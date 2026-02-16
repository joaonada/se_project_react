import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, handleCardDelete }) {
  const handleDeleteClick = () => {
    handleCardDelete(card);
  };
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        >
        </button>
        <button 
        className="modal__delete-button" 
        onClick={handleDeleteClick}
      >
        Delete item
      </button>
        <img
          src={card.imageUrl}
          alt={`${card.name} clothing item`}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
       </div>
  );
}

export default ItemModal;
