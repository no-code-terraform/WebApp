import Tabs from "../Tabs";
import Search from "../Search";
import DropDown from "../Dropdown";

const Sidebar = () => {
  return (
    <div className="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <Tabs />
      <Search />
      <DropDown />
    </div>
  );
};

export default Sidebar;
