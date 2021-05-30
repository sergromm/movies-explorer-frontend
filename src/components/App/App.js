import { Route, Switch, useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "./NotFound";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import SignUp from "../Credentials/SignUp";
import SignIn from "../Credentials/SignIn";

function App() {
  const [currentUser, setCurrenUser] = useState();
  const [movies, setMovies] = useState([]);
  const [requestLangIsRU, setRequestLangIsRU] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const searchInName = (name, param) =>
    name ? name.toLowerCase().includes(param.toLowerCase()) : "";

  const refineFilter = (movie, param) => {
    const regexRU = /[А-я0-9]/gi;

    if (regexRU.test(param)) {
      setRequestLangIsRU(true);
      return searchInName(movie.nameRU, param);
    }
    setRequestLangIsRU(false);

    return searchInName(movie.nameEN, param);
  };

  const filterSearch = (movies, param) =>
    movies.filter((movie) => refineFilter(movie, param));

  const removeFromLocalStorage = (name) => localStorage.removeItem(name);

  const saveToLocalStorage = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
  };

  const handleFilmSearch = (searchParam) => {
    if (!searchParam) {
      setMovies([]);
      return removeFromLocalStorage("movies");
    }
    setLoading(true);
    return moviesApi
      .getFilmsList()
      .then((res) => {
        const searchResult = filterSearch(res, searchParam);
        setMovies(searchResult);
        saveToLocalStorage("movies", searchResult);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const getMovies = () => {
    const items = JSON.parse(localStorage.getItem("movies"));
    if (items) {
      setMovies(items);
    }
  };

  const loginUser = useCallback(
    (user) => {
      if (user) {
        setCurrenUser(user);
        history.push("/movies");
      }
    },
    [history]
  );

  const validateUser = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .validateUser(token)
        .then(loginUser)
        .catch((err) => console.log(err));
    }
  };

  const handleSignUp = (email, password, name) => {
    mainApi.signUp(email, password, name).then(console.log);
  };

  const handleSignIn = (email, password) => {
    mainApi.signIn(email, password).then((res) => {
      localStorage.setItem("jwt", `Bearer ${res.token}`);
      validateUser();
      setLoggedIn(true);
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
    setCurrenUser(null);
  };

  // api
  //   .register("email@email.com", "password", "Роман")
  //   .then(console.log)
  //   .catch(console.log);

  useEffect(getMovies, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .validateUser(token)
        .then((user) => {
          if (user) {
            setCurrenUser(user);
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch(console.log);
    }
  }, [history]);

  console.log(currentUser);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header isLoggedIn={isLoggedIn} />
            <Movies
              movies={movies}
              handleFilmSearch={handleFilmSearch}
              isLoading={isLoading}
              requestLangIsRU={requestLangIsRU}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header isLoggedIn={isLoggedIn} />
            <Profile handleSignOut={handleSignOut} />
          </Route>
          <Route path="/signup">
            <SignUp handleSubmit={handleSignUp} />
          </Route>
          <Route path="/signin">
            <SignIn handleSubmit={handleSignIn} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
