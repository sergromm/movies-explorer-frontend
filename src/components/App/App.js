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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [requestLangIsRU, setRequestLangIsRU] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrenUser] = useState({
    name: "",
    email: "email@mail.com",
    savedMovies: [],
  });
  const history = useHistory();

  const searchInName = (name, query) =>
    name ? name.toLowerCase().includes(query.toLowerCase()) : "";

  const refineFilter = (movie, query) => {
    const regexRU = /[А-я0-9]/gi;
    if (regexRU.test(query)) {
      setRequestLangIsRU(true);
      return searchInName(movie.nameRU, query);
    }
    setRequestLangIsRU(false);
    return searchInName(movie.nameEN, query);
  };

  const filterSearch = (movies, query) =>
    movies.filter((movie) => refineFilter(movie, query));

  const removeFromLocalStorage = (name) => localStorage.removeItem(name);

  const saveToLocalStorage = (name, item) => {
    localStorage.setItem(name, item);
  };

  const handleRequestError = ({ message, validation }) => {
    if (validation) {
      return setErrorMessage(validation.body.message);
    }
    return setErrorMessage(message);
  };

  const getMovies = () => {
    const items = JSON.parse(localStorage.getItem("movies"));
    if (items) setMovies(items);
  };

  // ЗАТУП, не понял как сократить до одной функции, хотя и вижу что они одинаковые
  const handleShortFilmsToggle = (isShortMovies) => {
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    if (isShortMovies) return setMovies(shortMovies);
    return getMovies();
  };

  const handleSavedMoviesSwitch = (isShortMovies, movies) => {
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    if (isShortMovies) return setSavedMovies(shortMovies);
    return setSavedMovies(JSON.parse(localStorage.getItem("saved-movies")));
  };

  const handleSavedMoviesSearch = (query, isShortMovies) => {
    if (!query) {
      setSavedMovies(JSON.parse(localStorage.getItem("saved-movies")));
      setErrorMessage("Введите поисковой запрос");
    }
    const searchResult = filterSearch(savedMovies, query);
    saveToLocalStorage("saved-movies", JSON.stringify(searchResult));
    const shortSavedMovies = searchResult.filter(
      (result) => result.duration <= 40
    );
    if (isShortMovies) return setSavedMovies(shortSavedMovies);
    return setSavedMovies(searchResult);
  };

  const handleFilmSearch = (query, isShortMovies) => {
    if (!query) {
      setMovies([]);
      setErrorMessage("Введите поисковой запрос");
      return removeFromLocalStorage("movies");
    }
    setLoading(true);
    return moviesApi
      .getFilmsList()
      .then((res) => {
        const searchResult = filterSearch(res, query);
        const filterResuts = (result) => {
          const savedMovie = savedMovies.find(
            (movie) => movie.movieId === result.id
          );
          return savedMovie ? savedMovie : result;
        };
        const newMovies = searchResult.map(filterResuts);
        const shortMovies = searchResult.filter(
          (result) => result.duration <= 40
        );

        if (isShortMovies) {
          setMovies(shortMovies);
        } else {
          setMovies(newMovies);
        }
        saveToLocalStorage("movies", JSON.stringify(newMovies));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const loginUser = useCallback(
    (user) => {
      if (user) {
        setLoggedIn(true);
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

  const handleSignIn = (email, password) => {
    mainApi
      .signIn(email, password)
      .then((res) => {
        saveToLocalStorage("jwt", `Bearer ${res.token}`);
        validateUser();
        setLoggedIn(true);
      })
      .catch((err) => err.then(handleRequestError));
  };

  const handleSignUp = (email, password, name) => {
    mainApi
      .signUp(email, password, name)
      .then((res) => {
        if (res) handleSignIn(email, password);
      })
      .catch((err) => err.then(handleRequestError));
  };

  const handleUserUpdate = (name, email) => {
    const token = localStorage.getItem("jwt");
    mainApi
      .updateUserProfile(name, email, token)
      .then(({ name, email }) => {
        setCurrenUser({ ...currentUser, name, email });
      })
      .catch((err) => {
        if (err) setErrorMessage("Не удалось обновить профиль");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
    setCurrenUser(null);
    setErrorMessage("");
  };

  const getSavedMovies = () => {
    const token = localStorage.getItem("jwt");
    mainApi
      .getSavedMovies(token)
      .then((movies) => {
        setLoading(true);
        if (movies) {
          const newMovies = movies.filter(
            (movie) => movie.owner === currentUser._id
          );
          setSavedMovies(newMovies);
          saveToLocalStorage("saved-movies", JSON.stringify(newMovies));
        }
      })
      .catch((err) => {
        if (isLoggedIn) setErrorMessage("Не удалось получить список фильмов");
      })
      .finally(() => setLoading(false));
  };

  const handleSaveMovie = (movie) => {
    const token = localStorage.getItem("jwt");
    mainApi.saveMovie(movie, token).then((movie) => {
      const newMovies = movies.map((m) => (m.id === movie.movieId ? movie : m));
      const newSavedMovies = [...savedMovies, movie];

      setMovies(newMovies);
      saveToLocalStorage("movies", JSON.stringify(newMovies));
      setSavedMovies(newSavedMovies);
      saveToLocalStorage("saved-movies", JSON.stringify(newSavedMovies));
    });
  };

  const handleDeleteMovie = (movie) => {
    const token = localStorage.getItem("jwt");
    mainApi.deleteSavedMovie(token, movie._id).then((movie) => {
      const replacement = moviesData.find((m) => m.id === movie.movieId);
      const newSavedMovies = savedMovies.filter((m) => m._id !== movie._id);
      const newMovies = movies.map((m) =>
        m.movieId === replacement.id ? replacement : m
      );

      setMovies(newMovies);
      saveToLocalStorage("movies", JSON.stringify(newMovies));
      setSavedMovies(newSavedMovies);
      saveToLocalStorage("saved-movies", JSON.stringify(newSavedMovies));
    });
  };

  useEffect(() => {
    moviesApi.getFilmsList().then(setMoviesData).catch(console.log);
  }, []);
  useEffect(validateUser, [history, loginUser]);
  useEffect(getSavedMovies, [currentUser, isLoggedIn]);
  useEffect(getMovies, [savedMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/movies"
            movies={movies}
            handleFilmSearch={handleFilmSearch}
            isLoading={isLoading}
            requestLangIsRU={requestLangIsRU}
            handleSaveMovie={handleSaveMovie}
            component={Movies}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            handleShortFilmsToggle={handleShortFilmsToggle}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            movies={savedMovies}
            handleFilmSearch={handleSavedMoviesSearch}
            requestLangIsRU={requestLangIsRU}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            handleShortFilmsToggle={handleSavedMoviesSwitch}
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path="/profile"
            handleSignOut={handleSignOut}
            handleUserUpdate={handleUserUpdate}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            component={Profile}
            isLoggedIn={isLoggedIn}
            isProfilePage
          />
          <Route path="/signup">
            <SignUp
              handleSubmit={handleSignUp}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Route>
          <Route path="/signin">
            <SignIn
              handleSubmit={handleSignIn}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
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
