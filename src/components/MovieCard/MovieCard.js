import './MovieCard.css';
import image from '../../images/banksy.png';
import React from 'react';

function MovieCard() {
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = (evt) => {
    evt.preventDefault();
    console.log(isSaved);
    isSaved ? setIsSaved(false) : setIsSaved(true);
  };

  return (
    <li className="movie">
      <div className="movie__header">
        <h3 className="movie__title">В погоне за Бэнкси</h3>
        <p className="movie__duration">27 минут</p> 
      </div>
      <img className="movie__image" src={image} alt="В погоне за Бэнкси" />
      <button 
        onClick={handleSave} 
        className={`movie__save ${isSaved && 'movie__save_saved'} opacity`}>
          {!isSaved && 'Сохранить'}
      </button>
    </li>
  );
};

export default MovieCard;
