import React from "react";

const Button = ({ type = "button", onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mt-8 transition"
    >
      {children}
    </button>
  );
};

export default Button;
