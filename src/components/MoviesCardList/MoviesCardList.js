import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";
import ShowMore from "./ShowMore";
import useRenderOptions from "../../hooks/useWindowResize";

function MoviesCardList({ movies, requestLangIsRU }) {
  const { renderOptions, setShowOption } = useRenderOptions();
  const [renderSize, addToRender] = renderOptions;

  const handleShowMoreClick = () => {
    setShowOption([renderSize + addToRender, addToRender]);
  };

  return (
    <>
      <ul className="movies-list">
        {movies &&
          movies
            .slice(0, renderSize)
            .map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                requestLangIsRU={requestLangIsRU}
              />
            ))}
      </ul>
      {movies.length > renderSize && (
        <ShowMore handleClick={handleShowMoreClick} />
      )}
    </>
  );
}

export default MoviesCardList;
