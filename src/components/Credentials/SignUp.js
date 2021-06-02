import "./Credentials.css";
import { useFormWithValidation } from "../../hooks/useForm";
import Hero from "./Hero/Hero";
import Form from "./Form/Form";

function SignUp({ handleSubmit, errorMessage, setErrorMessage }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({});
  const { email, password, name } = values;

  const onInputChange = (e) => {
    e.preventDefault();
    handleChange(e);
    setErrorMessage("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    handleSubmit(email, password, name);
  };

  const signUpInputsProps = [
    {
      onChange: onInputChange,
      text: "Имя",
      placeholder: "Имя",
      type: "input",
      name: "name",
      minLength: 2,
      pattern: "^[А-яA-z-_0-9]+$",
      errors: errors.name,
      required: true,
    },
    {
      onChange: onInputChange,
      text: "E-mail",
      placeholder: "email@email.com",
      type: "email",
      name: "email",
      minLength: 3,
      errors: errors.email,
      required: true,
    },
    {
      onChange: onInputChange,
      text: "Пароль",
      placeholder: "Пароль",
      type: "password",
      name: "password",
      minLength: 5,
      errors: errors.password,
      required: true,
    },
  ];

  const signUpButtonProps = {
    handleClick: handleSignUp,
    text: "Зарегистрироваться",
    question: "Уже зарегистрированы?",
    endpoint: "/signin",
    linkText: "Вход",
    isValid,
    error: errorMessage,
  };

  return (
    <section className="credentials">
      <Hero />
      <Form
        inputsProps={signUpInputsProps}
        buttonProps={signUpButtonProps}
        handleSubmit={handleSignUp}
      />
    </section>
  );
}

export default SignUp;
