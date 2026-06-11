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
        <p className="sidebar__username">{currentUser.name}</p>
        <img
          src={currentUser.avatarUrl}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
        <button className="sidebar__btn" onClick={handleEditProfileClick}>Change profile data</button>
        <button className="sidebar__btn" onClick={handleSignOutClick}>Log out</button>
      </div>
    </aside>
  );
}
