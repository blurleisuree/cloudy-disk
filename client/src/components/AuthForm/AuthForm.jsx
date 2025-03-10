import { useEffect, useState } from "react";

import VerifyEmail from "../VerifyEmail/VerifyEmail";
import LoginRegisterForm from "../LoginRegisterForm/LoginRegisterForm";

function AuthForm() {
  // Переключение входа/регистрация
  // TODO переделать в функцию высшего порядка ?
  const [isLogin, setIsLogin] = useState(() => initIsLogin());
  function initIsLogin() {
    const storedValue = localStorage.getItem("isLogin");
    return storedValue !== null ? storedValue === "true" : true;
    // Если не пустое значение false : true
  }

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin.toString());
  }, [isLogin]);

  function toggleIsLogin() {
    setIsLogin((prev) => !prev);
  }

  // Для того чтобы передавать email в VerifyEmail
  const [currentEmail, setCurrentEmail] = useState(null)
  const [isVerify, setIsVerify] = useState(false);
  function toggleIsVerify(email) {
    setCurrentEmail(email)
    setIsVerify(!isVerify);
  }

  if (isVerify) return <VerifyEmail toggleIsVerify={toggleIsVerify} email={currentEmail}/>;

  return (
    <LoginRegisterForm
      isLogin={isLogin}
      toggleIsLogin={toggleIsLogin}
      toggleIsVerify={toggleIsVerify}
    />
  );
}

export default AuthForm;