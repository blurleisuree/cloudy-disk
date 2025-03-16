import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router";

import Input from "../UI/Input/Input";
import FormButton from "../UI/FormButton/FormButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный формат email")
    .required("Email обязателен")
    .max(30, "Слишком большой email")
    .trim(),
});

function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onBlur",
  });

  const { error, loading, forgotPassword } = useAuthStore();
  const navigate = useNavigate();
  const submitEmail = async (data) => {
    try {
      await forgotPassword(data.email);
      navigate("/auth/reset-password", { state: data.email });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className=" bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/5 self-center"
      onSubmit={handleSubmit(submitEmail)}
    >
      <h3 className="font-medium text-2xl mb-6">Востановление пароля</h3>
      <p className="mb-4">
        Введите адрес электронной почты на который зарегистрирован ваш аккаунт
      </p>
      <Input
        label="Email"
        type="text"
        name="email"
        register={register}
        errors={errors.email}
        placeholder="youremail@cloudy.com"
      />

      <p className="text-red-600 mt-2">{error}</p>
      <FormButton type="submit" disabled={loading}>
        Подтвердить
      </FormButton>
      <p
        className="block mt-5 underline underline-offset-2 text-secondary-color cursor-pointer"
        onClick={() => navigate("/auth")}
      >
        Назад к авторизации
      </p>
    </form>
  );
}

export default ForgotForm;
