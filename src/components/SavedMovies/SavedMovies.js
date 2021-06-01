import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({
  movies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {
  return (
    <section className="saved-movies">
      <SearchForm />
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
