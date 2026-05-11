import { useContext, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { updateUser } from "../../utils/api";

const EditProfileModal = ({ isOpen, onEditItem, onClose }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const userDataObject = {
    name: currentUser?.name ?? "",
    avatarUrl: currentUser?.avatarUrl ?? "",
  };

  console.log("Current user:", currentUser);

  const { values, handleChange, setValues } = useForm(userDataObject);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const token = localStorage.getItem("jwt");

    updateUser(values, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <ModalWithForm
      name="editProfile"
      title="EditProfile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="edit-profile-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="edit-avatar-url" className="modal__label">
        Avatar
        <input
          type="url"
          name="avatarUrl"
          className="modal__input"
          id="edit-avatar-url"
          placeholder="Avatar URL"
          required
          value={values.avatarUrl}
          onChange={handleChange}
          autoComplete="url"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
