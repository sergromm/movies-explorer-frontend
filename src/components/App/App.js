import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Credentials from "../Credentials/Credentials";

function App() {
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
          <Movies />
          <Footer />
        </Route>
      </Switch>
      <Route path="/saved-movies">
        <Header />
        <SavedMovies />
        <Footer />
      </Route>
      <Route path="/profile">
        <Header />
        <Profile />
      </Route>
      <Route path="/register">
        <Credentials isRegisterForm />
      </Route>
      <Route path="/login">
        <Credentials />
      </Route>
    </div>
  );
}

export default App;
