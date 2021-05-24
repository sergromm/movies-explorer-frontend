import "./Input.css";

function Input(props) {
  return (
    <label className="credentials-input__label">
      {props.text}
      <input className="credentials-input__input" {...props} />
      <p className="credentials-input__input-error">Сообщение об ошибке</p>
    </label>
  );
}

export default Input;
