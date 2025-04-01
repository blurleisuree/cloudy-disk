import { Link, Outlet } from "react-router";
import classes from "./AuthPage.module.css";

import Logo from "../../shared/components/UI/Logo/Logo";
import Text from "../../shared/components/UI/Text/Text";

function AuthPage() {
  return (
    <div>
      <div
        className={`${classes.Login} h-screen contaier mx-auto flex items-center justify-center flex-col`}
      >
        <Logo className="mb-10" type="text" />
        <Outlet />
      </div>
      <Text className="absolute bottom-8 left-8 opacity-3">
        © 2025 Cloudy Диск
      </Text>
      <Link
        to="#"
        className="absolute bottom-8 right-8 text-md text-gray-500 font-medium underline underline-offset-2 hidden sm:block opacity-3"
      >
        Политика конфиденциальности
      </Link>
    </div>
  );
}

export default AuthPage;
