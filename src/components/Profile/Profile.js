import { useContext, useEffect } from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile({ handleSignOut, handleUserUpdate, isSuccess, errorMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, resetForm } = useFormWithValidation();
  const { name, email } = values;
  const nameRegEx = "^[А-яA-z-_0-9]+$";

  const onSubmit = (e) => {
    e.preventDefault();
    handleUserUpdate(name, email);
  };

  useEffect(
    () => resetForm({ name: currentUser.name, email: currentUser.email }),
    [resetForm, currentUser]
  );

  const isNewInfo =
    currentUser.name !== name || currentUser.email !== email ? true : false;

  return (
    <section className="profile">
      <form onSubmit={onSubmit} className="profile__form" noValidate>
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <ul className="profile__info">
          <li className="profile__item profile__item_name">
            <p className="profile__text">Имя</p>
            <input
              type="text"
              name="name"
              className="profile__text"
              value={name}
              onChange={handleChange}
              pattern={nameRegEx}
              minLength={2}
              required
            />
          </li>
          <li className="profile__item profile__item_email">
            <p className="profile__text">E-mail</p>
            <input
              type="email"
              name="email"
              className="profile__text"
              value={email}
              onChange={handleChange}
              minLength={3}
              required
            />
          </li>
        </ul>
        <p className="profile__error">{errorMessage}</p>
        <button
          type="submit"
          className="profile__button profile__button_edit opacity"
          disabled={!(isValid && isNewInfo)}
        >
          Редактировать
        </button>
        <button
          onClick={handleSignOut}
          className="profile__button profile__button_exit opacity"
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
