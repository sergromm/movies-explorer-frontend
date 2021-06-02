import Input from "./Input";

function FieldSet({ inputsProps }) {
  return (
    <fieldset className="credentials__inputs">
      {inputsProps.map((props) => (
        <Input key={props.text} {...props} />
      ))}
    </fieldset>
  );
}

export default FieldSet;
