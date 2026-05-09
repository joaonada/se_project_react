import { useState } from "react"; 
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (currentUser?.isLoggedIn) ? (children) : (<Navigate to="/" />);
}

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardLike={handleCardLike}
      />
    </ProtectedRoute>
  }
/>

