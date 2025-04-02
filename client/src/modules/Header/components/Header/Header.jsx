import SearchBar from "../SearchBar/SearchBar";
import HeaderPopUpMenu from "../HeaderPopUpMenu/HeaderPopUpMenu";

function Header() {
  return (
    <div className="h-28 w-full flex py-4 px-12 border-b  flex-row items-center justify-between">
      <SearchBar />
      <HeaderPopUpMenu />
    </div>
  );
}

export default Header;
