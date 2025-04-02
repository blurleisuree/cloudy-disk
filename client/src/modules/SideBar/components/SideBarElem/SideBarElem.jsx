import { useNavigate, useLocation } from "react-router";

function SideBarElem({ text, src, link, alt, srcActive }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(link);
  }

  const url = useLocation().pathname;
  const isActive = url === link;

  return (
    <a
      onClick={handleClick}
      className={`flex items-center py-4 px-4 font-medium text-gray-500 cursor-pointer hover:bg-blue-100 transition ${
        isActive
          ? "bg-blue-100 text-primary-color font-semibold"
          : "bg-transparent"
      }`}
    >
      <img src={isActive ? srcActive : src} alt={alt} className="mr-3 w-7" />
      {text}
    </a>
  );
}

export default SideBarElem;
