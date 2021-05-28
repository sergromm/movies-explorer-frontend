import React from "react";
import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";
import ShowMore from "./ShowMore";

function MoviesCardList({ movies, requestLangIsRU }) {
  return (
    <>
      <ul className="movies-list">
        {movies &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              requestLangIsRU={requestLangIsRU}
            />
          ))}
      </ul>
      {movies && <ShowMore />}
    </>
  );
}

export default MoviesCardList;
