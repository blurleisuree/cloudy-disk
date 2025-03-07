import logo from "../../assets/logo.svg";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import classes from "./Registration.module.css";

function Registration() {
  return (
    <div>
      <div className={classes.Registration + ' h-screen contaier mx-auto flex items-center justify-center flex-col'}>
        <img src={logo} alt="logo" />
        <RegistrationForm />
      </div>
      <p className="text-md text-gray-500 absolute bottom-8 left-8 opacity-3 font-medium">
        © 2025 Cloudy Диск
      </p>
      <a
        href="#"
        className="text-md text-gray-500 absolute bottom-8 right-8 opacity-3 font-medium underline underline-offset-2"
      >
        Политика конфиденциальности
      </a>
    </div>
  );
}

export default Registration;
