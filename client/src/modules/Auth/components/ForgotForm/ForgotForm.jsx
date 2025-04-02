import useAuthStore from "../../../../shared/store/authStore";
import useAuthForm from "../../hooks/useAuthForm";
import { useNavigate } from "react-router";

import Input from "../../../../shared/components/UI/Input/Input";
import FormButton from "../../../../shared/components/UI/FormButton/FormButton";
import FormTitle from "../FormTitle/FormTitle";
import NavText from "../NavText/NavText";
import ErrorText from "../ErrorText/ErrorText";
import FormSubtitle from "../FormSubtitle/FormSubtitle";

function ForgotForm() {
  const { error, loading, forgotPassword } = useAuthStore();

  const { register, handleSubmit, errors } = useAuthForm({
    formType: "forgotPassword",
    mode: "onBlur",
  });

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
