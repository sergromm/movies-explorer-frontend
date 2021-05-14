import './Header.css';
import logo from '../../images/icons/logo.svg';

function Header({ isLoggedIn = false }) {
  return (
    <header className="header indent">
      <a href="/" className="header__logo-link">
        <img className="header__logo opacity" src={logo} alt='logo' />
      </a>
      {!isLoggedIn
        ? <div>
            <a href='/register' className="header__register opacity">Регистрация</a>
            <button className="header__login opacity">Войти</button>
          </div>
        : <nav>asd</nav>
      }
    </header>
  );
};

export default Header;
