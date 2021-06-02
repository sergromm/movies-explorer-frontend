import "./MovieCard.css";
import noImage from "../../images/icons/no-image.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function MovieCard({
  movie,
  isSavedMovie,
  requestLangIsRU,
  handleSave,
  handleDelete,
  savedMovies,
}) {
  const currentUser = useContext(CurrentUserContext);
  const url = "https://api.nomoreparties.co";
  const isSaved = movie.owner && movie.owner === currentUser._id;
  const name = requestLangIsRU ? movie.nameRU : movie.nameEN;
  const imageURL = movie.image ? url + movie.image.url : noImage;

  const handleSaveButton = () => {
    handleSave(movie);
  };

  const handleDeleteButton = () => {
    handleDelete(movie);
  };

  return (
    <>
      {movie !== null && (
        <li className="movie">
          <div className="movie__header">
            <h3 className="movie__title">{name}</h3>
            <p className="movie__duration">{movie.duration} мин</p>
          </div>
          <a className="movie__image" href="/movies">
            <img
              className="movie__image"
              src={
                isSavedMovie || typeof movie.image === "string"
                  ? movie.image
                  : imageURL
              }
              alt={name}
            />
          </a>
          {isSavedMovie ? (
            <button
              onClick={handleDeleteButton}
              className="movie__button movie__button_remove opacity"
            />
          ) : (
            <button
              onClick={!isSaved ? handleSaveButton : handleDeleteButton}
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
