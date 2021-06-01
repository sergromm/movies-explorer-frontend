import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList({
  movies,
  requestLangIsRU,
  renderSize,
  isSavedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {
  const MoviesList = movies
    .slice(0, renderSize)
    .map((movie) => (
      <MovieCard
        key={movie.id || movie.movieId}
        movie={movie}
        requestLangIsRU={requestLangIsRU}
        handleSave={handleSaveMovie}
        handleDelete={handleDeleteMovie}
        savedMovies={savedMovies}
      />
    ));

  const savedMoveisList = movies.map((movie) => (
    <MovieCard
      key={movie.movieId}
      movie={movie}
      requestLangIsRU={requestLangIsRU}
      handleSave={handleSaveMovie}
      handleDelete={handleDeleteMovie}
      savedMovies={savedMovies}
      isSavedMovie
    />
  ));

  return (
    <ul className="movies-list">
      {movies && (isSavedMovies ? savedMoveisList : MoviesList)}
    </ul>
  );
}

export default MoviesCardList;
