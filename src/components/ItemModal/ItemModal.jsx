import "./ItemModal.css";

function ItemModal({isOpen, onClose, card}) {
    return (
      <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__content modal__content_type_image">
         <button 
            onClick={onClose} 
            type="button" 
            className="modal__close"
            aria-label="Close modal"
            >
                { }
        </button>
        <img src={card.link} alt={`${card.name} clothing item`} className="modal__image" />
        <div className="modal__footer">
           <h2 className="modal__caption">{card.name}</h2> 
           <p className="modap__weather">Weather: {card.weather}</p>
        </div>
      </div>
     </div>   
    );
}

export default ItemModal;