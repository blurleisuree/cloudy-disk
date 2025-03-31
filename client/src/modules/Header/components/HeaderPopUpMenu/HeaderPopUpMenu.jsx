import PopUpMenu from "../../../../shared/components/PopUpMenu/PopUpMenu";
import ProfileBtn from "../ProfileBtn/ProfileBtn";

import settingsSvg from "../../assets/settings.svg";
import profileSvg from "../../assets/profileMini.svg";
import exitSvg from "../../assets/exit.svg";

import { useNavigate } from "react-router";
import usePopUpMenuStore from "../../../../shared/store/popUpMenuStore";
import useOpenExitModal from "../../../../shared/hooks/useOpenExitModal";

function HeaderPopUpMenu() {
  const navigate = useNavigate();
  const openExitModal = useOpenExitModal();
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
      onClick: openExitModal,
    },
  ];

  const toggleMenu = usePopUpMenuStore((state) => state.toggleMenu);
  const triggerElement = <ProfileBtn className="" onClick={toggleMenu} />;

  return <PopUpMenu menuItems={menuItems} triggerElement={triggerElement} />;
}

export default HeaderPopUpMenu;
