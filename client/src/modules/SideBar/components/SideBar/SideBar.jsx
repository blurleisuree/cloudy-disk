import Logo from "../../../../shared/components/UI/Logo/Logo";
import AddFileBtn from "../AddFileBtn/AddFileBtn";
import SideBarElem from "../SideBarElem/SideBarElem";

import { sideBarItems } from '../../data/sideBarItems'

function SideBar() {
  return (
    <div className="w-fit border-r border-gray-200 h-screen py-6">
      <Logo className="mx-8 mb-4 h-24 max-w-48" type="cloudy" />
      <AddFileBtn />
      {sideBarItems.map((item) => (
        <SideBarElem key={item.alt} {...item} />
      ))}
    </div>
  );
}

export default SideBar
