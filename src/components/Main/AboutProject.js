import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project indent" id="about-project">
      <h2 className="section-title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__description">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__description">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <figure className="about-project__weeks">
          <p className="about-project__figure about-project__figure_backend">
            1 Неделя
          </p>
          <figcaption className="about-project__caption">Backend</figcaption>
        </figure>
        <figure className="about-project__weeks">
          <p className="about-project__figure">4 Недели</p>
          <figcaption className="about-project__caption">Frontend</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default AboutProject;
