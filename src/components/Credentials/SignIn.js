import "./Credentials.css";
import { useFormWithValidation } from "../../hooks/useForm";
import Hero from "./Hero/Hero";
import Form from "./Form/Form";
import FormButton from "./FormButton/FormButton";
import FieldSet from "./Form/FieldSet";

function SignIn({ handleSubmit }) {
  const { values, handleChange } = useFormWithValidation();
  const { email, password } = values;

  const handleSignIn = (e) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

  const signInInputsProps = [
    {
      onChange: handleChange,
      text: "E-mail",
      placeholder: "email@email.com",
      type: "email",
      name: "email",
      minLength: 3,
    },
    {
      onChange: handleChange,
      text: "Пароль",
      placeholder: "Пароль",
      type: "password",
      name: "password",
      minLength: 5,
    },
  ];

  const signIpButtonProps = {
    handleClick: handleSignIn,
    text: "Войти",
    question: "Ещё не зарегистрированы?",
    endpoint: "/signup",
    linkText: "Регистрация",
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
