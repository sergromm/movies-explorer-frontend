import './Switch.css';

function Switch() {
  return (
    <label className="switch" id="switch">
      <input type="checkbox" name="switch" className="switch__button" />
      <span className="switch__slider"></span>
    </label>
  );
};

export default Switch;
