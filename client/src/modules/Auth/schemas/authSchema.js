import * as Yup from "yup";

const emailField = Yup.string()
  .email("Неправильный формат email")
  .required("Email обязателен")
  .max(30, "Слишком большой email")
  .trim();

const passwordField = Yup.string()
  .min(5, "Пароль должен быть не менее 5-ти символов")
  .max(12, "Пароль должен быть не более 12-ти символов")
  .required("Пароль обязателен")
  .matches(
    /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d]{5,}$/,
    "Пароль должен состоять из букв и цифр"
  );

const codeField = Yup.string()
  .required("Введите код подтверждения")
  .matches(/^\d{6}$/, "Код должен состоять из 6 цифр")
  .trim();

const universalSchema = (formType) => {
  const fields = {};

  if (["login", "registration", "forgotPassword", "resetPassword"].includes(formType)) {
    fields.email = emailField;
  }

  if (["login", "registration", "resetPassword"].includes(formType)) {
    fields.password = passwordField;
  }

  if (["verify", "resetPassword"].includes(formType)) {
    fields.code = codeField;
  }

  return Yup.object().shape(fields);
};

export default universalSchema