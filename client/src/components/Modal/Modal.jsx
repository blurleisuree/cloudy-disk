import React from "react";

import classes from "./Modal.module.css";
import FormButton from "../UI/FormButton/FormButton";
import cross from "../../assets/cross.svg";

function Modal({ closeModal, logout }) {
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
          onClick={closeModal}
          className="w-5 cursor-pointer absolute right-5 top-5 hover:scale-125 ease-linear transition duration-150 "
        />
        <p className="text-xl text-black font-medium">
          Вы уверены, что хотите выйти из аккаунта?
        </p>
        <FormButton onClick={closeModal}>Отмена</FormButton>
        <FormButton onClick={logout}>Выйти</FormButton>
      </div>
    </div>
  );
}

export default Modal;
