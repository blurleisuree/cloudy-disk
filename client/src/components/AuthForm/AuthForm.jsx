import classes from "./AuthForm.module.css";
import { useState } from "react";

import useAuthStore from "../../store/authStore";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный формат email")
    .required("Email обязателен")
    .max(30, "Слишком большой email")
    .trim(),
  password: Yup.string()
    .min(5, "Пароль должен быть не менее 5-ти символов")
    .max(12, "Пароль должен быть не более 12-ти символов")
    .required("Пароль обязателен")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
      "Пароль должен содержать минимум одну букву"
    ),
});

function AuthForm() {
  const { login, registration } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    alert(`Форма отправлена!`);
    try {
      isLogin
        ? await login(data.email, data.password)
        : await registration(data.email, data.password);
    } catch (e) {
      // console.error(e);
      alert(e);
    }
    reset();
  };

  return (
    <form
      className={
        classes.AuthForm +
        " bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/6 self-center"
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-medium text-2xl mb-6">
        {isLogin ? "Вход" : "Регистрация"}
      </h3>

      <Input
        label="Email адрес"
        type="text"
        name="email"
        placeholder="your@email.com"
        register={register}
        errors={errors.email}
      />
      <Input
        label="Пароль"
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="somepassword"
        register={register}
        errors={errors.password}
      />

      <input
        type="checkbox"
        onClick={() => setShowPassword(!showPassword)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:rounded-sm active:rounded-sm"
      />
      <label className="ms-2 mt-1">Показать пароль</label>

      <FormButton type="submit">
        {isLogin ? "Войти" : "Зарегестрироваться"}
      </FormButton>
      <p
        className="block mt-4 underline underline-offset-2 text-secondary-color cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}
      </p>
    </form>
  );
}

export default AuthForm;

// TODO: модальное окно при ошибке входа