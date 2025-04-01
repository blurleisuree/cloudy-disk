import useAuthStore from "../../../../store/authStore";
import { useNavigate } from "react-router";

import Input from "../../../../shared/components/UI/Input/Input";
import FormButton from "../../../../shared/components/UI/FormButton/FormButton";
import FormTitle from "../FormTitle/FormTitle";
import NavText from "../NavText/NavText";
import ErrorText from "../ErrorText/ErrorText";
import FormSubtitle from "../FormSubtitle/FormSubtitle";

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
    <form onSubmit={handleSubmit(submitEmail)}>
      <FormTitle>Востановление пароля</FormTitle>
      <FormSubtitle>
        Введите адрес электронной почты на который зарегистрирован ваш аккаунт
      </FormSubtitle>
      <Input
        label="Email"
        type="text"
        name="email"
        register={register}
        errors={errors.email}
        placeholder="youremail@cloudy.com"
      />

      {error && <ErrorText className="mt-2">{error}</ErrorText>}
      <FormButton type="submit" disabled={loading}>
        Подтвердить
      </FormButton>
      <NavText
        className="mt-5 text-secondary-color"
        onClick={() => navigate("/auth")}
      >
        Назад к авторизации
      </NavText>
    </form>
  );
}

export default ForgotForm;
