import "./Switch.css";

function Switch({ handleToggle, isShortMovies }) {
  return (
    <label className="switch" id="switch">
      <input
        type="checkbox"
        name="switch"
        className="switch__button"
        onChange={handleToggle}
        checked={isShortMovies}
      />
      <span className="switch__slider"></span>
    </label>
  );
}

export default Switch;
