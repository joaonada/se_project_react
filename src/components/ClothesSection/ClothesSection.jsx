import "../ClothesSection/ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
}) {
  console.log(clothingItems);
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Text</p>
        <button>BUTTON</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
        .map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
