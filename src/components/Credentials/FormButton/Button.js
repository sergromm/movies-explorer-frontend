function Button({ text, isValid = false }) {
  return (
    <button
      type="submit"
      className="credentials__button opacity"
      disabled={!isValid}
    >
      {text}
    </button>
  );
}

export default Button;
