import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title title-text">Учебный проект студента факультета Веб-разработки.</h1>
        <nav className="promo__nav">
          <a className="promo__link opacity" href="/">О проекте</a>
          <a className="promo__link opacity" href="/">Технологии</a>
          <a className="promo__link opacity" href="/">Студент</a>
        </nav>
      </div>
    </section>
  );
};

export default Promo;
