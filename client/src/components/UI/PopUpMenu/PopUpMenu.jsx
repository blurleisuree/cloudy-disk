import PopUpMenuElem from "../PopUpMenuElem/PopUpMenuElem";
import classes from "./PopUpMenu.module.css";

import usePopUpMenuStore from "../../../store/popUpMenuStore";

function PopUpMenu({ triggerElement, menuItems }) {
  const { anchorEl, menuItems: items, open, close } = usePopUpMenuStore();

  const handleClick = (event) => {
    open(event.currentTarget, menuItems);
  };

  const handleClose = () => {
    close();
  };

  return (
    <div className="relative h-min">
      <div onClick={handleClick}>{triggerElement}</div>

      {anchorEl && items.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={handleClose} />

          <div
            className={`block absolute right-0 mt-5 py-4 w-max bg-white rounded-lg shadow-lg z-50 ${classes.popup}`}
          >
            {items.map((item, index) => (
              <PopUpMenuElem
                key={index + item.text}
                text={item.text}
                src={item.src}
                alt={item.alt}
                onClick={item.onClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PopUpMenu;
