import { useContext, useEffect, useForm } from "react"; 
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onEditItem, onClose }) => {
  
  const { currentUser } = useContext(CurrentUserContext);

  const userDataObject = {
  name: currentUser?.name ?? "",
  avatarUrl: currentUser?.avatarUrl ?? ""
};

console.log("Current user:", currentUser);

const { values, handleChange, setValues } = useForm(userDataObject);

  function handleSubmit(evt) {
    evt.preventDefault();
    onEditItem(values);
  }

return (
    <ModalWithForm
      name="editProfile"
      title="EditProfile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="EditProfile-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar
        <input
          type="url"
          name="avatarUrl"
          className="modal__input"
          id="avatarUrl"
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
