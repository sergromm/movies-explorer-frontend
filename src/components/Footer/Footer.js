import './Footer.css';

function Footer() {
  return(
    <footer className="footer indent">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrapper">
        <p className="footer__date">© 2021</p>
        <ul className="footer__links">
          <li className="footer__item">
            <a href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer" className="footer__link opacity">Яндекс.Практикум</a>
          </li>
          <li className="footer__item">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__link opacity">Github</a>
          </li>
          <li className="footer__item">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer__link opacity">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
