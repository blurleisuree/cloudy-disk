import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

function SideBarElem({ text, src, link, alt }) {
  const navigate = useNavigate();

  function onClick() {
    navigate(link);
  }

  const [isActive, setIsActive] = useState(false);
  const url = useLocation().pathname;
  useEffect(() => {
    if (url === "/" + alt) {
      setIsActive(true);
    }
  }, [url, alt]);

  return (
    <div
      onClick={onClick}
      className={`flex items-center py-4 px-4 font-medium cursor-pointer hover:bg-blue-100 transition ${
        isActive ? "bg-blue-100 text-primary-color" : "bg-transparent"
      }`}
    >
      <img src={src} alt={alt} className="mr-3 w-7" />
      {text}
    </div>
  );
}

export default SideBarElem;
