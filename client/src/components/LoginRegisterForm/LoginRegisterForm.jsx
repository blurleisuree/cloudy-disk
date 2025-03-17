import { useState } from "react";
import useAuthStore from "../../store/authStore";

import { useNavigate } from "react-router";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
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
      /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d]{5,}$/,
      "Пароль должен содержать минимум одну букву"
    ),
});

function LoginRegisterForm({ isLogin, toggleIsLogin }) {
  const { login, registration, error, loading } = useAuthStore();

  // Для инпута с паролем
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await registration(data.email, data.password);
        navigate("/auth/verify", { state: data.email });
      }
    } catch (e) {
      console.log(e);
      // В случае если пользователь с неподтвержденной почтой
      if (e.message === "Подтвердите email для входа") {
        navigate("/auth/verify", { state: data.email });
      }
    }
    reset();
  };

  return (
    <form
      className=" bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-80 self-center"
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
      <p
        className="mt-2 text-primary-color cursor-pointer underline"
        onClick={() => navigate("/auth/forgot-password")}
      >
        Забыли пароль?
      </p>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <FormButton type="submit" disabled={loading}>
        {isLogin ? "Войти" : "Зарегестрироваться"}
      </FormButton>
      <p
        className="block mt-4 underline underline-offset-2 text-secondary-color cursor-pointer"
        onClick={toggleIsLogin}
      >
        {isLogin ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}
      </p>
    </form>
  );
}

export default LoginRegisterForm;

//TODO Сделать переиспользуемую форму и туда вынести пол компонента
