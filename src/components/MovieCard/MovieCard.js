import './MovieCard.css';
import image from '../../images/banksy.png';
import React from 'react';

function MovieCard({ isSavedMovie }) {
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = (evt) => {
    evt.preventDefault();
    isSaved ? setIsSaved(false) : setIsSaved(true);
  };

  return (
    <li className="movie">
      <div className="movie__header">
        <h3 className="movie__title">В погоне за Бэнкси</h3>
        <p className="movie__duration">27 минут</p>
      </div>
      <img className="movie__image" src={image} alt="В погоне за Бэнкси" />
      {isSavedMovie
        ? <button className="movie__button movie__button_remove opacity" />
        : <button
          onClick={handleSave}
          className={`movie__button ${isSaved && 'movie__button_saved'} opacity`}>
          {!isSaved && 'Сохранить'}
        </button>
      }
    </li>
  );
};

export default MovieCard;
