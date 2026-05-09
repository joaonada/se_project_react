import { useContext } from "react"; 
//import { NavLink } from "react-router-dom";
import "./Header.css";
//import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
//import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, handleSignOutClick, handleSignInClick,
  handleSignUpClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser } = useContext(CurrentUserContext);
  console.log("Weather data in Header:", weatherData);

  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__date-location">
          <p className="header__date">{currentDate}</p>
          <p className="header__location">
            {weatherData?.city || "Loading location..."}
          </p>
        </div>
      </div>
      
      <div className="header__user-container">
        {currentUser ? (
          <>
            <p className="header__username">{currentUser.name}</p>
            <img src={currentUser.avatar} alt={currentUser.name} className="header__avatar" />
            <button 
              onClick={handleSignOutClick}
              type="button" 
              className="header__sign-out-link"
            >
              Sign Out
            </button>
          </>
        ) : (
          <div>
            <button onClick={handleSignInClick}>Sign In</button>
            <button onClick={handleSignUpClick}>Sign Up</button>
            <button onClick={handleSignOutClick}>Sign Out</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;