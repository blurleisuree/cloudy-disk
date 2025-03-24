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
      <Outlet />
    </div>
  );
}

export default Profile;
