import SearchBar from "../UI/SearchBar/SearchBar";
import ProfileBtn from "../UI/ProfileBtn/ProfileBtn";
import PopUpMenu from "../UI/PopUpMenu/PopUpMenu";

import settingsSvg from "../../assets/settings.svg";
import profileSvg from "../../assets/profileMini.svg";
import exitSvg from "../../assets/exit.svg";

import Modal from "../../components/Modal/Modal";
import useExitModalStore from "../../store/exitModalStore";
import usePopUpMenuStore from "../../store/popUpMenuStore";
import { useNavigate } from "react-router";

function Header() {
  const toggleModal = useExitModalStore((state) => state.toggleModal);
  const toggleMenu = usePopUpMenuStore((state) => state.toggleMenu);

  const navigate = useNavigate();

  const menuItems = [
    {
      alt: "settings",
      text: "Настройки",
      src: settingsSvg,
      onClick: () => navigate("/profile/settings"),
    },
    {
      alt: "profile",
      text: "Профиль",
      src: profileSvg,
      onClick: () => navigate("/profile/details"),
    },
    {
      alt: "exitBtn",
      text: "Выйти из аккаунта",
      src: exitSvg,
      onClick: toggleModal,
    },
  ];

  const triggerElement = (
    <ProfileBtn
      className=""
      onClick={toggleMenu}
    />
  );

  return (
    <div className="h-28 w-full flex py-4 px-12 border-b  flex-row items-center justify-between">
      <SearchBar />
      <PopUpMenu menuItems={menuItems} triggerElement={triggerElement} />
      <Modal />
    </div>
  );
}

export default Header;
