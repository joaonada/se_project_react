import { useForm } from "../../../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onRegister, onClose }) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };
  
  const { values, handleChange, setValues } = useForm(defaultValues);
  useEffect(() => {
  if (isOpen) {
    setValues(defaultValues);
  }
}, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      name="New garment"
      title="New garment"
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
          id="register-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Avatar
        <input
          type="url"
          name="avatarUrl"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
          autoComplete="url"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select avatar type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weatherType"
            id="hot"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
          />{" "}
          Email
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weatherType"
            id="warm"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
          />{" "}
          Password
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weatherType"
            id="cold"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default RegisterModal;

