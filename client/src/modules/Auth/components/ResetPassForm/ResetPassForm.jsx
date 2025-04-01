import useAuthStore from "../../../../store/authStore";
import useMessageStore from "../../../../shared/store/messageStore";
import useShowPassStore from "../../store/showPassStore";
import { useNavigate, useLocation } from "react-router";

import Input from "../../../../shared/components/UI/Input/Input";
import FormButton from "../../../../shared/components/UI/FormButton/FormButton";
import FormTitle from "../FormTitle/FormTitle";
import NavText from "../NavText/NavText";
import ErrorText from "../ErrorText/ErrorText";
import ShowPass from "../ShowPass/ShowPass";
import GetNewCode from "../GetNewCode/GetNewCode";
import FormSubtitle from "../FormSubtitle/FormSubtitle";

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
  const isShowPass = useShowPassStore((state) => state.isShowPass);

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

  const addMessage = useMessageStore((state) => state.addMessage);

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
