import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import ShowMore from './ShowMore';

function MoviesCardList({ isSavedMovie }) {
  const moviesList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ]
  return (
    <>
      <ul className="movies-list">
        {moviesList.map((movie, i) => <MovieCard key={i} isSavedMovie={isSavedMovie} />)}
      </ul>
      <ShowMore />
    </>
  );
};

export default MoviesCardList;
