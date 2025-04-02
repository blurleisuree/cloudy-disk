import { Outlet } from "react-router";
import Tabs from "./components/Tabs/Tabs";

function Profile() {
  return (
    <div>
      <Tabs />
      <div className="p-10 flex">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
