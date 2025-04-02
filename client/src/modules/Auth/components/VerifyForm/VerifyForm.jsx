import { useLocation, useNavigate } from "react-router";
import useAuthStore from "../../../../store/authStore";
import useMessageStore from "../../../../shared/store/messageStore";
import useAuthForm from "../../hooks/useAuthForm";

import Input from "../../../../shared/components/UI/Input/Input";
import FormButton from "../../../../shared/components/UI/FormButton/FormButton";
import FormTitle from "../FormTitle/FormTitle";
import NavText from "../NavText/NavText";
import ErrorText from "../ErrorText/ErrorText";
import GetNewCode from "../GetNewCode/GetNewCode";
import FormSubtitle from "../FormSubtitle/FormSubtitle";

function VerifyForm() {
  const addMessage = useMessageStore((state) => state.addMessage);
  const email = useLocation().state;

  const { register, handleSubmit, errors } = useAuthForm({
    formType: "verify",
    mode: "onBlur",
  });

  const { error, verify, resendCode } = useAuthStore();

  const navigate = useNavigate();
  const submitCode = async (data) => {
    try {
      const res = await verify(data.code, email);
      addMessage(res.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitCode)}>
      <FormTitle>Подтвердите адрес электронной почты</FormTitle>
      <FormSubtitle>
        На адрес вашей электронной почты{" "}
        <span className="text-primary-color">{email || "error"}</span>{" "}
        отправлено письмо с проверочным кодом.
      </FormSubtitle>
      <Input
        label="Проверочный код"
        type="text"
        name="code"
        register={register}
        errors={errors.code}
        placeholder="Введите код"
      />

      <GetNewCode email={email} resendFunc={resendCode} />

      {error && <ErrorText className="mt-2">{error}</ErrorText>}
      <FormButton type="submit">Подтвердить</FormButton>
      <NavText
        className="mt-5 text-secondary-color"
        onClick={() => navigate("/auth")}
      >
        Назад к регистрации
      </NavText>
    </form>
  );
}

export default VerifyForm;
