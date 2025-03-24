import Logo from "../UI/Logo/Logo";
import AddFileBtn from "../UI/AddFileBtn/AddFileBtn";
import SideBarElem from "../UI/SideBarElem/SideBarElem";

import filesSvg from "../../assets/files.svg";
import starSvg from "../../assets/star.svg";

function SideBar() {
  return (
    <div className="w-64 border-r border-gray-200 h-screen py-6">
      <Logo className="mx-4" />
      <AddFileBtn />
      <SideBarElem alt="files" src={filesSvg} link="/files" text="Файлы" />
      <SideBarElem
        alt="favourite"
        src={starSvg}
        link="/favourite"
        text="Избранное"
      />
    </div>
  );
}

export default SideBar;
