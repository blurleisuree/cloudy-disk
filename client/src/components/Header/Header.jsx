import classes from "./Header.module.css";

import SearchBar from "../UI/SearchBar/SearchBar";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import { useState } from "react";
import PopUpMenu from "../UI/PopUpMenu/PopUpMenu";

import settingsSvg from "../../assets/settings.svg";
import profileSvg from "../../assets/profileMini.svg";
import exitSvg from "../../assets/exit.svg";

import Modal from "../../components/Modal/Modal";
import useAuthStore from "../../store/authStore";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  const menuElems = [
    { alt: "settings", text: "Настройки", src: settingsSvg },
    { alt: "profile", text: "Профиль", src: profileSvg },
    { alt: "exitBtn", text: "Выйти из аккаунта", src: exitSvg, onClick: toggleModal },
  ];

  const logout = useAuthStore((state) => state.logout);
  const [modalIsActive, setModalIsActive] = useState(false);
  function toggleModal() {
    setModalIsActive(!modalIsActive);
  }

  return (
    <div className="h-28 border-b w-full flex py-4 px-12 flex-row-reverse ">
      {/* <SearchBar /> */}
      <ProfileBtn
        className="w-12 cursor-pointer transition active:opacity-35"
        onClick={toggleMenu}
      />
      <PopUpMenu arr={menuElems} isOpen={isOpen} toggleModal={toggleModal}/>
      {modalIsActive && <Modal closeModal={toggleModal} logout={logout} />}
    </div>
  );
}

export default Header;
