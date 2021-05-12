import './Portfolio.css';

function Portfolio() {
  return(
    <section className="portfolio indent">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__item opacity">
          <a className="portfolio__link" href="https://github.com">
            <p className="portfolio__text">Одностроничный сайт</p><p className="portfolio__text portfolio__text_arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item opacity">
          <a className="portfolio__link" href="https://github.com">
            <p className="portfolio__text">Адаптивный сайт</p><p className="portfolio__text portfolio__text_arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item opacity">
          <a className="portfolio__link" href="https://github.com">
            <p className="portfolio__text">Одностроничное приложение</p><p className="portfolio__text portfolio__text_arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
