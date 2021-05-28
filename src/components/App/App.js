import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Credentials from "../Credentials/Credentials";
import NotFound from "./NotFound";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [requestLangIsRU, setRequestLangIsRU] = useState();
  const [isLoading, setLoading] = useState(false);

  const searchInName = (name, param) =>
    name ? name.toLowerCase().includes(param.toLowerCase()) : "";

  const refineSearch = (movie, param) => {
    const regexRU = /[А-я0-9]/gi;

    if (regexRU.test(param)) {
      setRequestLangIsRU(true);
      return searchInName(movie.nameRU, param);
    }
    setRequestLangIsRU(false);
    return searchInName(movie.nameEN, param);
  };

  const filterSearch = (movies, param) =>
    movies.filter((movie) => refineSearch(movie, param));

  const handleFilmSearch = (searchParam) => {
    setLoading(true);
    moviesApi
      .getFilmsList()
      .then((movies) => {
        setMovies(filterSearch(movies, searchParam));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  // api
  //   .register("email@email.com", "password", "Роман")
  //   .then(console.log)
  //   .catch(console.log);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header />
          <Movies
            movies={movies}
            handleFilmSearch={handleFilmSearch}
            isLoading={isLoading}
            requestLangIsRU={requestLangIsRU}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route path="/signup">
          <Credentials isRegisterForm />
        </Route>
        <Route path="/signin">
          <Credentials />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
