import './SearchForm.css';
import Switch from '../Switch/Switch';

function SearchForm() {
  return (
    <form className="search">
      <div className="search__field">
        <input type="search" name="search" className="search__input" placeholder="Фильм" />
        <button className="search__button opacity"></button>
      </div>
      <div className="search__switch-wrapper">
        <p className="search__switch-label">Короткометражки</p>
        <Switch />
      </div>
    </form>
  );
};

export default SearchForm;
