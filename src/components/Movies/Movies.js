import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import ShowMore from "../MoviesCardList/ShowMore";
import useRenderOptions from "../../hooks/useWindowResize";

function Movies({
  movies,
  handleFilmSearch,
  isLoading,
  requestLangIsRU,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
  handleShortFilmsToggle,
}) {
  const { renderOptions, setShowOption } = useRenderOptions();
  const [renderSize, addToRender] = renderOptions;

  const handleShowMoreClick = () => {
    setShowOption([renderSize + addToRender, addToRender]);
  };

  const renderContent = isLoading ? (
    <Preloader />
  ) : (
    <MoviesCardList
      movies={movies}
      requestLangIsRU={requestLangIsRU}
      renderSize={renderSize}
      handleSaveMovie={handleSaveMovie}
      handleDeleteMovie={handleDeleteMovie}
      savedMovies={savedMovies}
    />
  );

  const failedRequest = movies.length === 0 && (
    <p style={{ textAlign: "center", margin: "auto" }}>
      По запросу ничего не найдено
    </p>
  );

  const showMore = movies.length > renderSize && (
    <ShowMore handleClick={handleShowMoreClick} />
  );

  return (
    <main className="movies indent">
      <SearchForm
        handleSearch={handleFilmSearch}
        handleSwitch={handleShortFilmsToggle}
      />
      {renderContent}
      {showMore}
      {failedRequest}
    </main>
  );
}

export default Movies;
