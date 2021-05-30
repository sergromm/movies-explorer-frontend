import { useState } from "react";
import "./Profile.css";

function Profile({ handleSignOut }) {
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@uandex.ru");
  const handleInputChange = (func) => (e) => func(e.target.value);
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <ul className="profile__info">
        <li className="profile__item profile__item_name">
          <p className="profile__text">Имя</p>
          <input
            className="profile__text"
            value={name}
            onChange={handleInputChange(setName)}
          />
        </li>
        <li className="profile__item profile__item_email">
          <p className="profile__text">E-mail</p>
          <input
            className="profile__text"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
        </li>
      </ul>
      <button className="profile__button profile__button_edit opacity">
        Редактировать
      </button>
      <button
        onClick={handleSignOut}
        className="profile__button profile__button_exit opacity"
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
