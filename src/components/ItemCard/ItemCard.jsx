import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes.some(id => id === currentUser._id);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
  onCardLike({ id: item._id, isLiked });
};

  const itemLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_liked" : ""}`;

  return (
  <li className="card">
    <h2 className="card__name">{item.name}</h2>
    <img
      onClick={handleCardClick}
      className="card__image"
      src={item.imageUrl}
      alt={item.name}
    />
    {currentUser.isLoggedIn && (
      <button
        className={itemLikeButtonClassName}
        onClick={handleLike}
        type="button"
      >
      </button>
    )}
  </li>
);
};
export default ItemCard;
