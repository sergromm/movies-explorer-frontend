import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({
  movies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
  handleShortFilmsToggle,
  handleFilmSearch,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        handleSearch={handleFilmSearch}
        handleSwitch={handleShortFilmsToggle}
        movies={savedMovies}
      />
      <MoviesCardList
        movies={movies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        savedMovies={savedMovies}
        isSavedMovies
      />
    </section>
  );
}

export default SavedMovies;
