import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLoginClick, onRegisterClick, handleRegisterClick }) => {
  const defaultValues = {
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
    onLoginClick(values);
  }

  return (
    <ModalWithForm
      name="login"
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="Or Sign up"
      openSecondaryModal={handleRegisterClick}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </label>
      
    </ModalWithForm>
  );
};

export default LoginModal;
