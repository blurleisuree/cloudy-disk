import classes from "./RegistrationForm.module.css";
import { Link } from "react-router";
import { useFormStore } from "../../store/store";
import { registration } from "../../services/user";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

function RegistrationForm() {
  const { password, email, setPassword, setEmail, resetForm } = useFormStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Форма отправлена!`);
    registration(email, password);
    resetForm();
  };

  return (
    <div
      className={
        classes.RegistrarionForm +
        " bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/6 self-center"
      }
    >
      <h3 className="font-medium text-2xl mb-6">Регистрация</h3>
      <Input
        label="Email адрес"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormButton type="submit" onClick={(e) => handleSubmit(e)}>
        Отправить
      </FormButton>
      <Link
        to="/login"
        className="block mt-4 underline underline-offset-2 text-secondary-color"
      >
        Уже зарегистрированы?
      </Link>
    </div>
  );
}

export default RegistrationForm;
