import classes from "./LoginForm.module.css";
import { Link } from "react-router";
import { useFormStore } from "../../store/store";
import useAuthStore from "../../store/authStore";
// import { login } from "../../services/user";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

function LoginForm() {
  const { password, email, setPassword, setEmail, resetForm } = useFormStore();
  const { login, error, loading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Форма отправлена!`);
    try {
      await login(email, password);
    } catch (e) {
      console.error(e);
    }
    resetForm();
  };

  return (
    <div
      className={
        classes.LoginForm +
        " bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/6 self-center"
      }
    >
      <h3 className="font-medium text-2xl mb-6">Вход</h3>
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
        to="/registration"
        className="block mt-4 underline underline-offset-2 text-secondary-color"
      >
        Еще не зарегистрированы?
      </Link>
    </div>
  );
}

export default LoginForm;
