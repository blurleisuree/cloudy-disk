import useAuthStore from "../../../../shared/store/authStore";
import useMessageStore from "../../../../shared/store/messageStore";
import useShowPassStore from "../../store/showPassStore";
import useAuthForm from "../../hooks/useAuthForm";
import { useNavigate, useLocation } from "react-router";

import Input from "../../../../shared/components/UI/Input/Input";
import FormButton from "../../../../shared/components/UI/FormButton/FormButton";
import FormTitle from "../FormTitle/FormTitle";
import NavText from "../NavText/NavText";
import ErrorText from "../ErrorText/ErrorText";
import ShowPass from "../ShowPass/ShowPass";
import GetNewCode from "../GetNewCode/GetNewCode";
import FormSubtitle from "../FormSubtitle/FormSubtitle";

function ResetPassForm() {
  const isShowPass = useShowPassStore((state) => state.isShowPass);

  const { register, handleSubmit, errors } = useAuthForm({
    formType: "resetPassword",
    mode: "onBlur",
  });

  const { error, resetPassword, forgotPassword } = useAuthStore();

  const email = useLocation().state;
  const addMessage = useMessageStore((state) => state.addMessage);
  const navigate = useNavigate();
  const submitPassword = async (data) => {
    try {
      const res = await resetPassword(email, data.code, data.password);
      navigate("/auth");
      addMessage(res.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPassword)}>
      <FormTitle>Востановление пароля</FormTitle>
      <FormSubtitle>
        Введите код подтверждения который пришел вам на почту и укажите новый
        пароль.
      </FormSubtitle>
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
        type={isShowPass ? "text" : "password"}
        name="password"
        placeholder="somepassword"
        register={register}
        errors={errors.password}
      />
      <ShowPass />
      <GetNewCode email={email} resendFunc={forgotPassword} />
      {error && <ErrorText className="mt-2">{error}</ErrorText>}
      <FormButton type="submit">Подтвердить</FormButton>
      <NavText
        className="mt-5 text-secondary-color"
        onClick={() => navigate("/auth")}
      >
        Назад к авторизации
      </NavText>
    </form>
  );
}

export default ResetPassForm;
