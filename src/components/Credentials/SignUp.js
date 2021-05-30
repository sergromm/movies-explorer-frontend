import "./Credentials.css";
import { useFormWithValidation } from "../../hooks/useForm";
import Hero from "./Hero/Hero";
import Form from "./Form/Form";

function SignUp({ handleSubmit }) {
  const { values, handleChange } = useFormWithValidation();
  const { email, password, name } = values;

  const signUpInputsProps = [
    {
      onChange: handleChange,
      text: "Имя",
      placeholder: "Имя",
      type: "input",
      name: "name",
      minLength: 2,
    },
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

  const handleSignUp = (e) => {
    e.preventDefault();
    handleSubmit(email, password, name);
  };

  const signUpButtonProps = {
    handleClick: handleSignUp,
    text: "Зарегистрироваться",
    question: "Уже зарегистрированы?",
    endpoint: "/signin",
    linkText: "Вход",
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
