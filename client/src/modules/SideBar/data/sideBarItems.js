import filesSvg from "../assets/files.svg";
import filesActiveSvg from "../assets/files_active.svg";
import starSvg from "../assets/star.svg";
import starActiveSvg from "../assets/star_active.svg";

export const sideBarItems = [
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
