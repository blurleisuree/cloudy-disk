import { useNavigate } from "react-router";

function TabsElem({ name, link, isActive }) {
  const navigate = useNavigate();

  function handleClick(link) {
    return () => {
      navigate(link);
    };
  }

  return (
    <div
      className={`cursor-pointer py-3 px-5 font-medium text-gray-500 ${
        isActive ? "border-b-2 border-primary-color text-primary-color" : "bg-transparent"
      }`}
      onClick={handleClick(link)}
    >
      {name}
    </div>
  );
}

export default TabsElem;
