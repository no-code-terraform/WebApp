import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import OverviewFlow from "../../components/OverviewFlow";
import "bulma/css/bulma.min.css";
import "./index.scss";
import { useNodesState } from "reactflow";

const Index = (): JSX.Element => {
  const location = useLocation();
  const data: any = location.state;
  const yPos = useRef(0);
  const [nodes, setNodes] = useNodesState(data.infoProject.nodes);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services/")
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
      });
  }, []);

  const getNodeId = () => `id_${+new Date()}`;

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const modalToToggle: HTMLElement = document.querySelector(
      `#${event.currentTarget.getAttribute("data-target-modal")}`
    ) as HTMLInputElement;
    modalToToggle.classList.toggle("is-active");
  };

  const onAdd = useCallback(
    (labelNode: any) => {
      yPos.current += 50;
      const newNode = {
        id: getNodeId(),
        data: { label: labelNode },
        position: {
          x: 250,
          y: yPos.current,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <React.Fragment>
      <section className="page-project columns">
        <Modal toggleModalFunc={toggleModal} data={data.infoProject} />
        <div className="column is-2">
          {/* <Sidebar addNodeFunc={onAdd} /> */}
          <Sidebar services={services} addNodeFunc={onAdd} />
        </div>
        <div className="column is-10e">
          <div className="p-1 is-flex is-justify-content-space-between is-align-items-center">
            <p>{data.infoProject.name}</p>
            <button
              className="page-project__btnExport button is-link js-modal-trigger"
              onClick={toggleModal}
              data-target-modal="modal"
            >
              Export
            </button>
          </div>
          <OverviewFlow nodes={nodes} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
