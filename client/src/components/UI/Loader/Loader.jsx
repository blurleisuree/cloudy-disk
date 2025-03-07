import React from "react";

import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className="w-16 h-16 border-4 border-t-primary-color border-gray-300 rounded-full animate-spin"></div>
  );
}

export default Loader;
