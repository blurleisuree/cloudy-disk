import { Outlet } from "react-router";
import Tabs from "../../components/UI/Tabs/Tabs";

function Profile() {
  const tabsElems = [
    { name: "Настройки", link: "/profile/settings" },
    { name: "Профиль", link: "/profile/details" },
  ];

  return (
    <div>
      <Tabs elems={tabsElems} />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
