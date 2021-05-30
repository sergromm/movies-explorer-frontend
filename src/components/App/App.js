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
  const [isSuccess, setSuccess] = useState(true);
  const [movies, setMovies] = useState([]);
  const [requestLangIsRU, setRequestLangIsRU] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrenUser] = useState({
    name: "",
    email: "email@mail.com",
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
        setMovies(searchResult);
        saveToLocalStorage("movies", JSON.stringify(searchResult));
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

  const handleSignIn = (email, password) => {
    mainApi.signIn(email, password).then((res) => {
      saveToLocalStorage("jwt", `Bearer ${res.token}`);
      validateUser();
      setLoggedIn(true);
    });
  };

  const handleSignUp = (email, password, name) => {
    mainApi
      .signUp(email, password, name)
      .then((res) => {
        if (res) {
          handleSignIn(email, password);
        }
      })
      .catch((err) => err.then(({ message }) => setErrorMessage(message)));
  };

  const handleUserUpdate = useCallback(
    (name, email) => {
      const token = localStorage.getItem("jwt");
      mainApi
        .updateUserProfile(name, email, token)
        .then(({ name, email }) => {
          setCurrenUser({ ...currentUser, name, email });
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setSuccess(false);
            setErrorMessage("Не удалось обновить профиль");
          }
        });
    },
    [currentUser]
  );

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
    setCurrenUser(null);
  };

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
            <Profile
              handleSignOut={handleSignOut}
              handleUserUpdate={handleUserUpdate}
              isSuccess={isSuccess}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path="/signup">
            <SignUp handleSubmit={handleSignUp} errorMessage={errorMessage} />
          </Route>
          <Route path="/signin">
            <SignIn handleSubmit={handleSignIn} errorMessage={errorMessage} />
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
