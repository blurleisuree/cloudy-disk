import classes from "./Modal.module.css";
import Btn from "../UI/Btn/Btn";
import cross from "../../assets/cross.svg";

import useExitModalStore from "../../store/exitModalStore";
import useAuthStore from "../../store/authStore";

function Modal() {
  const { isOpen, toggleModal } = useExitModalStore();
  const logout = useAuthStore((state) => state.logout);

  function exit() {
    toggleModal();
    logout();
  }

  if (!isOpen) return null;

  return (
    <div
      className={
        classes.Modal__wrapper +
        " w-screen h-screen absolute top-0 left-0 flex items-center justify-center"
      }
    >
      <div className="w-1/4 h-max p-5 bg-white rounded-xl relative">
        <img
          src={cross}
          onClick={toggleModal}
          className="w-5 cursor-pointer absolute right-5 top-5 hover:scale-125 ease-linear transition duration-150 "
        />
        <p className="text-xl text-black font-medium">
          Вы уверены, что хотите выйти из аккаунта?
        </p>
        <div className="mt-6">
          <Btn handleClick={toggleModal} className='py-2 px-7'>Отмена</Btn>
          <Btn handleClick={exit} className='py-2 px-7 ml-4 border-red-500 text-red-500 hover:bg-red-100'>Выйти</Btn>
        </div>
      </div>
    </div>
  );
}

export default Modal;
