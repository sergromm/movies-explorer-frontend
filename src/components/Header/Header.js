import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/icons/logo.svg";
import Navigation from "../Navigation/Navigation";
import Burger from "./Burger";
import { useState } from "react";

function Header({ isLoggedIn = true }) {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const handleClose = () => {
    setIsNavigationVisible(false);
  };
  const handleOpen = () => {
    setIsNavigationVisible(true);
  };
  return (
    <header className="header indent">
      <Link to="/" className="header__logo-link">
        <img className="header__logo opacity" src={logo} alt="logo" />
      </Link>
      {!isLoggedIn ? (
        <div>
          <Link to="/signup" className="header__register opacity">
            Регистрация
          </Link>
          <button className="header__login opacity">Войти</button>
        </div>
      ) : (
        <>
          <Burger handleOpen={handleOpen} />
          <Navigation
            isNavigationVisible={isNavigationVisible}
            handleClose={handleClose}
          />
        </>
      )}
    </header>
  );
}

export default Header;
