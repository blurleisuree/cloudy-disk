import { Outlet } from "react-router";
import logo from "../../assets/logo_text.svg";
import AuthForm from "../../components/AuthForm/AuthForm";

import classes from "./AuthPage.module.css";

function AuthPage() {
  return (
    <div>
      <div
        className={
          classes.Login +
          " h-screen contaier mx-auto flex items-center justify-center flex-col"
        }
      >
        <img src={logo} alt="logo" className="mb-10" />
        <Outlet />
      </div>

      <p className="text-md text-gray-500 absolute bottom-8 left-8 opacity-3 font-medium">
        © 2025 Cloudy Диск
      </p>
      <a
        href="#"
        className="text-md text-gray-500 absolute bottom-8 right-8 opacity-3 font-medium underline underline-offset-2 hidden sm:block"
      >
        Политика конфиденциальности
      </a>
    </div>
  );
}

export default AuthPage;
