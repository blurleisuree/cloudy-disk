import React from "react";

import classes from "./LoaderPage.module.css";

function LoaderPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-primary-color border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoaderPage;
