import classes from "./AuthForm.module.css";
import { Link } from "react-router";
import { useFormStore } from "../../store/store";
import useAuthStore from "../../store/authStore";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";
import { useState } from "react";

function AuthForm() {
  const { password, email, setPassword, setEmail, resetForm } = useFormStore();
  const { login, register, error, loading } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Форма отправлена!`);
    try {
      isLogin ? await login(email, password) : await register(email, password);
    } catch (e) {
      console.error(e);
    }
    resetForm();
  };

  return (
    <div
      className={
        classes.AuthForm +
        " bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/6 self-center"
      }
    >
      <h3 className="font-medium text-2xl mb-6">
        {isLogin ? "Вход" : "Регистрация"}
      </h3>
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
        {isLogin ? "Войти" : "Зарегестрироваться"}
      </FormButton>
      <p
        className="block mt-4 underline underline-offset-2 text-secondary-color cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}
      </p>
    </div>
  );
}

export default AuthForm;
