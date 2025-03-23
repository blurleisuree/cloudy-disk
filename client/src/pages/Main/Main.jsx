import { Outlet } from "react-router";
import classes from "../Main/Main.module.css";

import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";

function Main() {
  return (
    <div>
      <SideBar />
      {/* <Header /> */}
      <Outlet />
    </div>
  );
}

export default Main;
