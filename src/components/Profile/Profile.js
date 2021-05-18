import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <ul className="profile__info">
        <li className="profile__item profile__item_name">
          <p className="profile__text">Имя</p>
          <p className="profile__text">Виталий</p>
        </li>
        <li className="profile__item profile__item_email">
          <p className="profile__text">E-mail</p>
          <p className="profile__text">pochta@uandex.ru</p>
        </li>
      </ul>
      <button className="profile__button profile__button_edit opacity">
        Редактировать
      </button>
      <button className="profile__button profile__button_exit opacity">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
