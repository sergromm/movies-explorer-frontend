import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Movies />
          <Footer />
        </Route>
      </Switch>
      <Route path="/saved-movies">
        <SavedMovies />
        <Footer />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route> 
    </div>
  );
};

export default App;
