import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Logo from "../images/Logo.png";
import avatar from "../images/avatar.png";
import { Link, Navigate } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  handleSignOutClick,
  handleSignInClick,
  handleSignUpClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser } = useContext(CurrentUserContext);
  console.log("Weather data in Header:", weatherData);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={Logo} alt="WTWR logo" />
        </Link>
        <div className="header__date-location">
          <p className="header__date">{currentDate},</p>
          <p className="header__location">
            {weatherData?.city || "Loading location..."}
          </p>
        </div>
      </div>

      <div className="header__user-container">
        {currentUser?.isLoggedIn ? (
          <>
            <ToggleSwitch />
            <button
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>
            <Link to="/profile">
              <p className="header__username">{currentUser.name}</p>
            </Link>
            <Link to="/profile">
              <img
                src={currentUser.avatar}
                alt={`${name} some text`}
                className="header__avatar"
              />{" "}
            </Link>
          </>
        ) : (
          <div className="header__btn-group">
            <button className="header__btn" onClick={handleSignInClick}>
              Sign In
            </button>
            <button className="header__btn" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
