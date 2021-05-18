import "./AboutMe.css";
import photo from "../../images/portfolio_photo.png";

function AboutMe() {
  return (
    <section className="about-me indent">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__wrapper">
          <h3 className="about-me__name title-text">Виталий</h3>
          <p className="about-me__info">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__story">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-me__links">
            <li className="about-me__item">
              <a
                className="about-me__link opacity"
                target="_blank"
                rel="noreferrer"
                href="https://github.com"
              >
                Github
              </a>
            </li>
            <li className="about-me__item">
              <a
                className="about-me__link opacity"
                target="_blank"
                rel="noreferrer"
                href="https://facebook.com"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;
