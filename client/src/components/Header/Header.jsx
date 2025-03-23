import classes from "./Header.module.css";

import SearchBar from "../UI/SearchBar/SearchBar";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import { useState } from "react";
import PopUpMenu from "../UI/PopUpMenu/PopUpMenu";

import settingsSvg from "../../assets/settings.svg";
import profileSvg from "../../assets/profileMini.svg";
import exitSvg from "../../assets/exit.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  const menuElems = [
    { alt: "settings", text: "Настройки", src: settingsSvg },
    { alt: "profile", text: "Профиль", src: profileSvg },
    { alt: "exitBtn", text: "Выйти из аккаунта", src: exitSvg },
  ];

  return (
    <div className="h-28 border-b w-full flex py-4 px-12 flex-row-reverse ">
      {/* <SearchBar /> */}
      <ProfileBtn
        className="w-12 cursor-pointer transition active:opacity-35"
        onClick={toggleMenu}
      />
      <PopUpMenu arr={menuElems} isOpen={isOpen} />
    </div>
  );
}

export default Header;
