const Tabs = () => {
  return (
    <div className="tabs">
      <ul>
        <li className="is-active">
          <a>Azure</a>
        </li>
        <li>
          <a>GCP</a>
        </li>
        <li>
          <a>AWS</a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
