import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function Movies() {
  const isLoading = false;
  return (
    <main className="movies indent">
      <SearchForm />
      {isLoading
        ? <Preloader />
        : <MoviesCardList />}
    </main>
  )
};

export default Movies;
