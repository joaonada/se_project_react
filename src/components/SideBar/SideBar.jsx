import "../SideBar/SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
    <div className="sidebar__user-container">
      <p className="sidebar__username">{currentUser.name}</p>
      <img src={currentUser.avatar} alt={currentUser.name} className="sidebar__avatar" />
      <button handleEditProfileClick></button>
    </div>
    </aside>
  );
}
//const handleEditProfileClick = () => { setActiveModal("edit-profile"); };