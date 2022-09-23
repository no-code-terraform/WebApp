

const Sidebar = () => {
  return (
    <aside className="menu">
      <p className="menu-label ">
        AWS Components
      </p>
      <ul className="menu-list">
        <li>
          <a className="is-active">Common</a>
          <ul>
            <li><a>item</a></li>
            <li><a>item</a></li>
            <li><a>item</a></li>
          </ul>
        </li>

        <li>
          <a className="is-active">Compute</a>
          <ul>
            <li><a>item</a></li>
            <li><a>item</a></li>
            <li><a>item</a></li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
