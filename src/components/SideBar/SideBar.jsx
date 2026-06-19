import "../SideBar/SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({
  handleSignOutClick,
  handleEditProfileClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button className="sidebar__btn" onClick={handleEditProfileClick}>
        Change profile data
      </button>
      <button className="sidebar__btn" onClick={handleSignOutClick}>
        Log out
      </button>
    </aside>
  );
}
