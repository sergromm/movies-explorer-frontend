import "./Input.css";

function Input(props) {
  return (
    <label className="credentials-input__label">
      {props.text}
      <input
        className="credentials-input__input"
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        minLength={props.minLength}
        required={props.required}
        pattern={props.pattern}
      />
      <p className="credentials-input__input-error">{props.errors}</p>
    </label>
  );
}

export default Input;
