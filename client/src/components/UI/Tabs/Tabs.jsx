import TabsElem from "../TabsElem/TabsElem";
import { useLocation } from "react-router";

function Tabs({ elems }) {
  const url = useLocation().pathname;

  return (
    <div className="flex border-b pt-3 px-5">
      {elems.map((elem) => {
        return <TabsElem key={elem.link} name={elem.name} link={elem.link} isActive={url === elem.link}/>;
      })}
    </div>
  );
}

export default Tabs;
