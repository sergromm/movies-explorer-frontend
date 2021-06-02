import Question from "./Question";
import Button from "./Button";

function FormButton({ text, question, endpoint, linkText, isValid, error }) {
  return (
    <div className="credentials__button-wrapper">
      <p className="credentials__error-message">{error}</p>
      <Button text={text} isValid={isValid} />
      <Question text={question} endpoint={endpoint} linkText={linkText} />
    </div>
  );
}

export default FormButton;
