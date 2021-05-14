import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import ShowMore from './ShowMore';

function MoviesCardList() {
  return (
    <>
      <ul className="movies-list">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </ul>
      <ShowMore />
    </>
  );
};

export default MoviesCardList;
