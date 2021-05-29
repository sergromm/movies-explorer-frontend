import "./MovieCard.css";
import React from "react";

function MovieCard({ movie, isSavedMovie, requestLangIsRU }) {
  const url = "https://api.nomoreparties.co";
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = (evt) => {
    evt.preventDefault();
    isSaved ? setIsSaved(false) : setIsSaved(true);
  };

  const name = requestLangIsRU ? movie.nameRU : movie.nameEN;
  const imageURL = movie.image ? url + movie.image.url : null;

  console.log(movie);

  return (
    <>
      {movie !== null && (
        <li className="movie">
          <div className="movie__header">
            <h3 className="movie__title">{name}</h3>
            <p className="movie__duration">{movie.duration} мин</p>
          </div>
          <img className="movie__image" src={imageURL} alt={name} />
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
      )}
    </>
  );
}

export default MovieCard;
