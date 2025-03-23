import SideBarElem from "../SideBarElem/SideBarElem";
import classes from './PopUpMenu.module.css'

function PopUpMenu({ arr, isOpen }) {
  return (
    <div className={`absolute w-fit mt-28 bg-white rounded-lg py-4 ${isOpen ? "block" : "hidden"} ${classes.popUp}`}>
      {arr.map((elem) => {
        return <SideBarElem
          key={elem.src}
          alt={elem.alt}
          text={elem.text}
          src={elem.src}
          onClick={elem.onClick}
        />;
      })}
    </div>
  );
}

export default PopUpMenu;
