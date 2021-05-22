import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({ isNavigationVisible, handleClose }) {
  return (
    <nav
      className={
        isNavigationVisible ? "navigation navigation_opened" : "navigation"
      }
    >
      <button onClick={handleClose} className="navigation__close opacity" />
      <NavLink
        onClick={handleClose}
        exact
        to="/"
        className="navigation__link navigation__link_top-indent opacity"
        activeClassName="navigation__link_active"
      >
        Главная
      </NavLink>
      <NavLink
        onClick={handleClose}
        to="/movies"
        className="navigation__link opacity"
        activeClassName="navigation__link_active"
      >
        Фильмы
      </NavLink>
      <NavLink
        onClick={handleClose}
        to="/saved-movies"
        className="navigation__link opacity"
        activeClassName="navigation__link_active"
      >
        Сохранённые фильмы
      </NavLink>
      <NavLink
        onClick={handleClose}
        to="/profile"
        className="navigation__link navigation__link_account opacity"
        activeClassName="navigation__link_active"
      >
        Аккаунт
        <div className="navigation__account-icon" />
      </NavLink>
    </nav>
  );
}

export default Navigation;
