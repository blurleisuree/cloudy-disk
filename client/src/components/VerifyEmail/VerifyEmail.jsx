import classes from "./VerifyEmail.module.css";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const codeSchema = Yup.object().shape({
  code: Yup.string()
    .required("Введите код подтверждения")
    .matches(/^\d{6}$/, "Код должен состоять из 6 цифр")
    .trim()
});

function VerifyEmail({ toggleIsVerify, email = "null" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(codeSchema),
    mode: "onBlur",
  });

  return (
    <form
      className={
        classes.AuthForm +
        " bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/6 self-center"
      }
      // onSubmit={handleSubmit(onSubmit)}
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
      <FormButton type="submit">Подтвердить</FormButton>
      <p
        className="block mt-4 underline underline-offset-2 text-secondary-color cursor-pointer"
        onClick={toggleIsVerify}
      >
        Назад к регистрации
      </p>
    </form>
  );
}

export default VerifyEmail;
