import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import classes from "./Error.module.css";

function Error() {
  return (
    <div
      className={
        classes.Error +
        " h-screen contaier mx-auto flex items-center justify-center flex-col"
      }
    >
      <img src={logo} alt="logo" />
      <h1 className="text-8xl">404</h1>
      <Link
        className="text-2xl underline-offset-5 underline cursor-pointer text-wrap text-center mt-1"
        to={-1}
      >
        Вернуться на предыдущую страницу
      </Link>
    </div>
  );
}

export default Error;
