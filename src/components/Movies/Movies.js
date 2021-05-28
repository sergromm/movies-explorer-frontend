import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ movies, handleFilmSearch, isLoading, requestLangIsRU }) {
  console.log(isLoading);
  return (
    <main className="movies indent">
      <SearchForm handleSearch={handleFilmSearch} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies} requestLangIsRU={requestLangIsRU} />
      )}
    </main>
  );
}

export default Movies;
