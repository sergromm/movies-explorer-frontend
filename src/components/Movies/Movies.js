import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";

function Movies({ movies, handleFilmSearch, isLoading, requestLangIsRU }) {
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
