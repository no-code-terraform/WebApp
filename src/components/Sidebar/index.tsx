import Tabs from "../Tabs";
import Search from "../Search";
import DropDown from "../Dropdown";

const Sidebar = () => {
  return (
    <div className="is-narrow-mobile is-hidden-mobile">
      <Tabs />
      <Search />
      <DropDown />
    </div>
  );
};

export default Sidebar;
