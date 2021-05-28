import "./SearchForm.css";
import Switch from "../Switch/Switch";
import { useForm } from "../../hooks/useForm";

function SearchForm({ handleSearch }) {
  const { values, handleChange } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(values.search);
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
        />
        <button className="search__button opacity"></button>
      </div>
      <div className="search__switch-wrapper">
        <p className="search__switch-label">Короткометражки</p>
        <Switch />
      </div>
    </form>
  );
}

export default SearchForm;
