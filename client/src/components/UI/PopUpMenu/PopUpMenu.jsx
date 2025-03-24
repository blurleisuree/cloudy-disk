import SideBarElem from "../SideBarElem/SideBarElem";
import classes from "./PopUpMenu.module.css";

function PopUpMenu({ arr, isOpen, toggleMenu }) {
  return (
    <>
      <div
        className={`z-20 absolute w-fit mt-28 bg-white rounded-lg py-4 ${
          isOpen ? "block" : "hidden"
        } ${classes.popUp}`}
      >
        {arr.map((elem) => {
          return (
            <SideBarElem
              key={elem.src}
              alt={elem.alt}
              text={elem.text}
              src={elem.src}
              link={elem.link}
              onClick={elem.onClick}
              toggleMenu={toggleMenu}
            />
          );
        })}
      </div>
      <div
        onClick={toggleMenu}
        className={`absolute z-10 w-screen h-screen top-0 left-0 ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
}

export default PopUpMenu;
// TODO Переделать этот ужас + при клике по элементу меню закрывать его