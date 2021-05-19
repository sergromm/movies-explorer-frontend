import "./Credentials.css";
import Input from "./Input";
import logo from "../../images/icons/logo.svg";

function Credentials({ isRegisterForm }) {
  return (
    <section className="credentials">
      <div className="credentials__hero">
        <img className="credentials__logo" src={logo} alt="Логотип" />
        <h2 className="credentials__welcome">
          {isRegisterForm ? "Добро пожаловать!" : "Рады видеть!"}
        </h2>
      </div>
      <form className="credentials__form">
        <fieldset className="credentials__inputs">
          {isRegisterForm && (
            <Input
              text="Имя"
              placeholder="Имя"
              type="input"
              name="name"
              minLength={2}
            />
          )}
          <Input
            text="E-mail"
            placeholder="email@email.com"
            type="email"
            name="email"
            minLength={3}
          />
          <Input
            text="Пароль"
            placeholder="Пароль"
            type="password"
            name="password"
            minLength={8}
          />
        </fieldset>
      </form>
      <div className="credentials__button-wrapper">
        <button className="credentials__button opacity">
          {isRegisterForm ? "Зарегистрироваться" : "Войти"}
        </button>
        <p className="credentials__question">
          {isRegisterForm
            ? "Уже зарегистрированы?"
            : "Ещё не зарегистрированы?"}
          <a
            className="credentials__redirect opacity"
            href={isRegisterForm ? "/login" : "/register"}
          >
            {isRegisterForm ? "Войти" : "Регистрация"}
          </a>
        </p>
      </div>
    </section>
  );
}

export default Credentials;
