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
    localStorage.setItem(name, item);
  };

  const handleRequestError = ({ message, validation }) => {
    if (validation) {
      return setErrorMessage(validation.body.message);
    }
    return setErrorMessage(message);
  };

  const handleFilmSearch = (searchParam) => {
    if (!searchParam) {
      setMovies([]);
      setErrorMessage("Введите поисковой запрос");
      return removeFromLocalStorage("movies");
    }
    setLoading(true);
    return moviesApi
      .getFilmsList()
      .then((res) => {
        const searchResult = filterSearch(res, searchParam);
        const newMovies = searchResult.map((result) => {
          const savedMovie = savedMovies.find(
            (movie) => movie.movieId === result.id
          );
          return savedMovie ? savedMovie : result;
        });
        console.log(newMovies);
        setMovies(newMovies);
        saveToLocalStorage("movies", JSON.stringify(newMovies));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const getMovies = () => {
    const items = JSON.parse(localStorage.getItem("movies"));
    if (items) setMovies(items);
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
        }
      })
      .catch((err) => setErrorMessage("Не удалось получить список фильмов"))
      .finally(() => setLoading(false));
  };

  const handleSaveMovie = (movie) => {
    const token = localStorage.getItem("jwt");
    mainApi.saveMovie(movie, token).then((movie) => {
      const newMovies = movies.map((m) => (m.id === movie.movieId ? movie : m));
      setMovies(newMovies);
      setSavedMovies([...savedMovies, movie]);
      saveToLocalStorage("movies", JSON.stringify(newMovies));
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
    });
  };

  useEffect(() => {
    moviesApi.getFilmsList().then(setMoviesData).catch(console.log);
  }, []);
  useEffect(validateUser, [history, loginUser]);
  useEffect(getSavedMovies, [currentUser]);
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
          <Route path="/movies">
            <Header isLoggedIn={isLoggedIn} />
            <Movies
              movies={movies}
              handleFilmSearch={handleFilmSearch}
              isLoading={isLoading}
              requestLangIsRU={requestLangIsRU}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies
              movies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header isLoggedIn={isLoggedIn} />
            <Profile
              handleSignOut={handleSignOut}
              handleUserUpdate={handleUserUpdate}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Route>
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
