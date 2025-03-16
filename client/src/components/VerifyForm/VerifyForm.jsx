import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import useAuthStore from "../../store/authStore";
import useStore from "../../store/store";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const codeSchema = Yup.object().shape({
  code: Yup.string()
    .required("Введите код подтверждения")
    .matches(/^\d{6}$/, "Код должен состоять из 6 цифр")
    .trim(),
});

function VerifyPage() {
  const email = useLocation().state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(codeSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const { error, verify, resendCode } = useAuthStore();

  const submitCode = async (data) => {
    try {
      await verify(data.code, email);
    } catch (e) {
      console.log(e);
    }
  };

  const { codeIsResend, setCodeIsResend } = useStore();
  const getNewCode = async () => {
    try {
      await resendCode(email);
      setCodeIsResend(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className=" bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/5 self-center"
      onSubmit={handleSubmit(submitCode)}
    >
      <h3 className="font-medium text-2xl mb-6">
        Подтвердите адрес электронной почты
      </h3>
      <p className="mb-4">
        На адрес вашей электронной почты{" "}
        <span className="text-primary-color">{email}</span> отправлено письмо с
        проверочным кодом.
      </p>
      <Input
        label="Проверочный код"
        type="text"
        name="code"
        register={register}
        errors={errors.code}
        placeholder="Введите код"
      />

      {codeIsResend ? (
        <p>Новый код отправлен! Проверьте почту</p>
      ) : (
        <p className="mt-6">
          Пожалуйста, проверьте папку со спамом.{" "}
          <span
            className="text-primary-color cursor-pointer"
            onClick={getNewCode}
          >
            Повторно отправить письмо с подтверждением.
          </span>
        </p>
      )}

      <p className="text-red-600 mt-2">{error}</p>
      <FormButton type="submit">Подтвердить</FormButton>
      <p
        className="block mt-5 underline underline-offset-2 text-secondary-color cursor-pointer"
        onClick={() => navigate("/auth")}
      >
        Назад к регистрации
      </p>
    </form>
  );
}

export default VerifyPage;
