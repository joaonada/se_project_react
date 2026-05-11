import "../Profile/Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleCardLike,
  handleEditProfileClick,
  handleSignOutClick,
}) {
  return (
    <div className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleSignOutClick={handleSignOutClick}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        handleCardLike={handleCardLike}
      />
    </div>
  );
}
