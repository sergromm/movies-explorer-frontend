import Question from "./Question";
import Button from "./Button";

function FormButton({ text, question, endpoint, linkText }) {
  return (
    <div className="credentials__button-wrapper">
      <Button text={text} />
      <Question text={question} endpoint={endpoint} linkText={linkText} />
    </div>
  );
}

export default FormButton;
