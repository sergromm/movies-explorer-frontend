import "./MovieCard.css";
import image from "../../images/banksy.png";
import React from "react";

function MovieCard({ movie, isSavedMovie, requestLangIsRU }) {
  const url = "https://api.nomoreparties.co";
  const [isSaved, setIsSaved] = React.useState(false);
  console.log(movie);
  const handleSave = (evt) => {
    evt.preventDefault();
    isSaved ? setIsSaved(false) : setIsSaved(true);
  };

  return (
    <li className="movie">
      <div className="movie__header">
        <h3 className="movie__title">
          {requestLangIsRU ? movie.nameRU : movie.nameEN}
        </h3>
        <p className="movie__duration">{movie.duration} мин</p>
      </div>
      <img
        className="movie__image"
        src={`${url}${movie.image.url}`}
        alt="В погоне за Бэнкси"
      />
      {isSavedMovie ? (
        <button className="movie__button movie__button_remove opacity" />
      ) : (
        <button
          onClick={handleSave}
          className={`movie__button ${
            isSaved && "movie__button_saved"
          } opacity`}
        >
          {!isSaved && "Сохранить"}
        </button>
      )}
    </li>
  );
}

export default MovieCard;
