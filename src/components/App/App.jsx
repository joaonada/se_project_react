import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  addItem,
  getItems,
  removeItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import { signin, signup, checkToken } from "../../utils/auth";
import { useNavigate, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser.isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({ isLoggedIn: false });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleRegisterClick = () => {
    setActiveModal("sign-up");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({ isLoggedIn: false });
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    removeItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    const makeRequest = () => {
      return addItem(newCardData, token).then((updatedCard) => {
        setClothingItems((cards) =>
          cards.concat((item) => (item._id === id ? updatedCard : item)),
        );
      });
    };

    handleSubmit(makeRequest);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser({
            ...userData,
            isLoggedIn: true,
          });
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setCurrentUser({ isLoggedIn: false });
        });
    }

    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        data.reverse();
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleLogin = (formData) => {
    try {
      signin(formData).then((response) => {
        localStorage.setItem("jwt", response.token);
        checkToken(response.token).then((userData) => {
          setCurrentUser({
            ...userData,
            isLoggedIn: true,
          });
          closeActiveModal();
          navigate("/profile");
        });
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleUpdateUser = (updatedUserData) => {
    const token = localStorage.getItem("jwt");
    setCurrentUser({
      ...updatedUserData,
      isLoggedIn: true,
    });
    const makeRequest = () => {
      return updateUser(inputValues).then(setCurrentUser);
    };

    handleSubmit(makeRequest);
  };

  const handleRegistration = (userData) => {
    signup(userData)
      .then((response) => {
        localStorage.setItem("jwt", response.token);
        return checkToken(response.token);
      })
      .then((userData) => {
        setCurrentUser({
          ...userData,
          isLoggedIn: true,
        });
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Register failed:", error);
        setErrorMessage("An unexpected error occurred");
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignInClick={handleSignInClick}
              handleSignUpClick={handleSignUpClick}
              handleSignOutClick={handleSignOutClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOutClick={handleSignOutClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            buttonText={isLoading ? "Saving..." : "Add garment"}
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            onClose={closeActiveModal}
            card={selectedCard}
            activeModal={activeModal}
            handleCardDelete={handleCardDelete}
          />
          <RegisterModal
            isOpen={activeModal === "sign-up"}
            onClose={closeActiveModal}
            onRegister={handleRegistration}
            onLoginClick={handleSignInClick}
          />
          <LoginModal
            isOpen={activeModal === "sign-in"}
            onClose={closeActiveModal}
            onLoginClick={handleLogin}
            handleRegisterClick={handleRegisterClick}
          />
          <EditProfileModal
            onUpdateUser={handleUpdateUser}
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
