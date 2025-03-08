import classes from "./Files.module.css";

import FormButton from "../../components/UI/FormButton/FormButton";
import useAuthStore from "../../store/authStore";

function Files() {
  const logout = useAuthStore((state) => state.logout);

  function openModal() {
    

    logout();
  }

  return (
    <div>
      <h1 className="text-5xl">Файлы</h1>
      <FormButton onClick={logout}>Выйти</FormButton>
    </div>
  );
}

export default Files;
