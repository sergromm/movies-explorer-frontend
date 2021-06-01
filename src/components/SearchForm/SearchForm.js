import "./SearchForm.css";
import Switch from "../Switch/Switch";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

function SearchForm({ handleSearch, handleSwitch, movies }) {
  const { values, handleChange } = useForm();
  const [isShortMovies, setShortMovies] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(values.search, isShortMovies);
  };

  const handleSwitchToggle = () => {
    if (isShortMovies) {
      setShortMovies(false);
    } else {
      setShortMovies(true);
    }
    handleSwitch(!isShortMovies, movies);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="search">
      <div className="search__field">
        <input
          onChange={handleChange}
          type="search"
          name="search"
          className="search__input"
          placeholder="Фильм"
          minLength={1}
          required
        />
        <button className="search__button opacity"></button>
      </div>
      <div className="search__switch-wrapper">
        <p className="search__switch-label">Короткометражки</p>
        <Switch
          handleToggle={handleSwitchToggle}
          isShortMovies={isShortMovies}
        />
      </div>
    </form>
  );
}

export default SearchForm;
