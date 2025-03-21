import useAuthStore from "../../store/authStore";
import useStore from "../../store/store";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const resetSchema = Yup.object().shape({
  code: Yup.string()
    .required("Введите код подтверждения")
    .matches(/^\d{6}$/, "Код должен состоять из 6 цифр")
    .trim(),
  password: Yup.string()
    .min(5, "Пароль должен быть не менее 5-ти символов")
    .max(12, "Пароль должен быть не более 12-ти символов")
    .required("Пароль обязателен")
    .matches(
      /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d]{5,}$/,
      "Пароль должен состоять из букв и цифр"
    ),
});

function ResetPassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetSchema),
    mode: "onBlur",
  });

  const { error, resetPassword, forgotPassword } = useAuthStore();
  const navigate = useNavigate();
  const email = useLocation().state;

  const submitPassword = async (data) => {
    try {
      await resetPassword(email, data.code, data.password);
    } catch (e) {
      console.log(e);
    }
  };

  // Для инпута с паролем
  const [showPassword, setShowPassword] = useState(false);

  const { codeIsResend, setCodeIsResend } = useStore();
  const getNewCode = async () => {
    try {
      await forgotPassword(email);
      setCodeIsResend(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className=" bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-80 self-center"
      onSubmit={handleSubmit(submitPassword)}
    >
      <h3 className="font-medium text-2xl mb-6">Востановление пароля</h3>
      <p className="mb-4">
        Введите код подтверждения который пришел вам на почту и укажите новый
        пароль.
      </p>
      <Input
        label="Код"
        type="text"
        name="code"
        register={register}
        errors={errors.code}
        placeholder="Введите код"
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

      {codeIsResend ? (
        <p className="mt-6">
          <span className="text-primary-color">Новый код отправлен!</span>{" "}
          Проверьте почту
        </p>
      ) : (
        <p className="mt-6">
          Пожалуйста, проверьте папку со спамом.{" "}
          <span
            className="text-primary-color cursor-pointer"
            onClick={getNewCode}
          >
            Повторно отправить письмо с кодом.
          </span>
        </p>
      )}

      <p className="text-red-600 mt-2">{error}</p>
      <FormButton type="submit">Подтвердить</FormButton>
      <p
        className="block mt-5 underline underline-offset-2 text-secondary-color cursor-pointer"
        onClick={() => navigate("/auth")}
      >
        Назад к авторизации
      </p>
    </form>
  );
}

export default ResetPassForm;
