import Logo from "../UI/Logo/Logo";
import AddFileBtn from "../UI/AddFileBtn/AddFileBtn";
import SideBarElem from "../UI/SideBarElem/SideBarElem";

import filesSvg from "../../assets/files.svg";
import filesActiveSvg from "../../assets/files_active.svg";
import starSvg from "../../assets/star.svg";
import starActiveSvg from "../../assets/star_active.svg";

function SideBar() {
  const sidebarItems = [
    {
      alt: "files",
      src: filesSvg,
      srcActive: filesActiveSvg,
      link: "/files",
      text: "Файлы",
    },
    {
      alt: "favourite",
      src: starSvg,
      srcActive: starActiveSvg,
      link: "/favourite",
      text: "Избранное",
    },
  ];

  return (
    <div className="w-fit border-r border-gray-200 h-screen py-6">
      <Logo className="mx-8 mb-4 h-24 max-w-48" />
      <AddFileBtn />
      {sidebarItems.map((item) => (
        <SideBarElem key={item.alt} {...item} />
      ))}
    </div>
  );
}

export default SideBar;
