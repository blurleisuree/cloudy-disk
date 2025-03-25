import { Outlet } from "react-router";
import classes from "../Main/Main.module.css";

import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";

function Main() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full h-screen">
        <Header />
        <div className="py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
