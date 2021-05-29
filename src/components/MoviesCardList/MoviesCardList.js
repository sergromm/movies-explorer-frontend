import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList({ movies, requestLangIsRU, renderSize }) {
  const MoviesList = movies
    .slice(0, renderSize)
    .map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        requestLangIsRU={requestLangIsRU}
      />
    ));

  return <ul className="movies-list">{MoviesList}</ul>;
}

export default MoviesCardList;
