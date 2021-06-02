import FormButton from "../FormButton/FormButton";
import FieldSet from "./FieldSet";

function Form({ inputsProps, buttonProps, handleSubmit }) {
  return (
    <form className="credentials__form" onSubmit={handleSubmit}>
      <FieldSet inputsProps={inputsProps} />
      <FormButton {...buttonProps} />
    </form>
  );
}

export default Form;
