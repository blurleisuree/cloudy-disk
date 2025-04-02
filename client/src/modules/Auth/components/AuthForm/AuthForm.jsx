import { useEffect, useState } from "react";

import LoginRegisterForm from "../LoginRegisterForm/LoginRegisterForm";

function AuthForm() {
  // Переключение входа/регистрация
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

  return <LoginRegisterForm isLogin={isLogin} toggleIsLogin={toggleIsLogin} />;
}

export default AuthForm;
