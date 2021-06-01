import "./Credentials.css";
import { useFormWithValidation } from "../../hooks/useForm";
import Hero from "./Hero/Hero";
import Form from "./Form/Form";
import { useEffect } from "react";

function SignIn({ handleSubmit, errorMessage, setErrorMessage }) {
  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation();
  const { email, password } = values;

  const handleSignIn = (e) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

  const onInputChange = (e) => {
    e.preventDefault();
    handleChange(e);
    setErrorMessage("");
  };

  useEffect(() => resetForm(), [resetForm]);

  const signInInputsProps = [
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

  const signIpButtonProps = {
    handleClick: handleSignIn,
    text: "Войти",
    question: "Ещё не зарегистрированы?",
    endpoint: "/signup",
    linkText: "Регистрация",
    isValid,
    error: errorMessage,
  };

  return (
    <section className="credentials">
      <Hero />
      <Form
        inputsProps={signInInputsProps}
        buttonProps={signIpButtonProps}
        handleSubmit={handleSignIn}
      />
    </section>
  );
}

export default SignIn;
