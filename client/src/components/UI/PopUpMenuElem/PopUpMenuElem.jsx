import usePopUpMenuStore from "../../../store/popUpMenuStore";

function PopUpMenuElem({ text, src, alt, onClick }) {
  const closeMenu = usePopUpMenuStore((state) => state.close);

  function handleClick() {
    closeMenu();
    onClick();
  }

  return (
    <div
      onClick={handleClick}
      className=" flex items-center py-4 px-4 font-medium cursor-pointer hover:bg-blue-100 transition bg-blue-100 bg-transparent"
    >
      <img src={src} alt={alt} className="mr-3 w-7" />
      {text}
    </div>
  );
}

export default PopUpMenuElem;
