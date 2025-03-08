import FormButton from "../../components/UI/FormButton/FormButton";
import Modal from "../../components/Modal/Modal";
import useAuthStore from "../../store/authStore";
import { useState } from "react";

function Files() {
  const logout = useAuthStore((state) => state.logout);
  const [modalIsActive, setModalIsActive] = useState(false);

  function openModal() {
    setModalIsActive(true);
  }

  function closeModal() {
    setModalIsActive(false);
  }

  return (
    <div>
      {modalIsActive && <Modal closeModal={closeModal} logout={logout} />}
      <h1 className="text-5xl">Файлы</h1>
      <FormButton onClick={openModal}>Выйти</FormButton>
    </div>
  );
}

export default Files;
