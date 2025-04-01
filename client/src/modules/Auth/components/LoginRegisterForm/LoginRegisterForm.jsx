import useAuthStore from "../../../../store/authStore";
import useShowPassStore from "../../store/showPassStore";
import { useNavigate } from "react-router";

import Input from "../../../../shared/components/UI/Input/Input";
import FormButton from "../../../../shared/components/UI/FormButton/FormButton";
import FormTitle from "../FormTitle/FormTitle";
import NavText from "../NavText/NavText";
import ErrorText from "../ErrorText/ErrorText";
import ShowPass from "../ShowPass/ShowPass";

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
      "Пароль должен состоять из букв и цифр"
    ),
});

function LoginRegisterForm({ isLogin, toggleIsLogin }) {
  const { login, registration, error, loading } = useAuthStore();
  const isShowPass = useShowPassStore((state) => state.isShowPass);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle> {isLogin ? "Вход" : "Регистрация"}</FormTitle>

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
        type={isShowPass ? "text" : "password"}
        name="password"
        placeholder="somepassword"
        register={register}
        errors={errors.password}
      />
      <ShowPass />
      <NavText
        className="mt-2 text-primary-color"
        onClick={() => navigate("/auth/forgot-password")}
      >
        Забыли пароль?
      </NavText>
      {error && <ErrorText className="mt-2">{error}</ErrorText>}
      <FormButton type="submit" disabled={loading}>
        {isLogin ? "Войти" : "Зарегестрироваться"}
      </FormButton>
      <NavText onClick={toggleIsLogin} className="text-secondary-color mt-4">
        {isLogin ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}
      </NavText>
    </form>
  );
}

export default LoginRegisterForm;
