import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import OverviewFlow from "../../components/OverviewFlow";
import "bulma/css/bulma.min.css";
import "./index.scss";
import {applyNodeChanges, useNodesState} from "reactflow";
import {saveAs} from "file-saver";
import { config } from "process";

const Index = (): JSX.Element => {
  const location = useLocation();
  const data: any = location.state;
  const yPos = useRef(0);
  const [nodes, setNodes] = useNodesState(data.infoProject.nodes);
  const [servicesApi, setServicesApi] = useState([]);
  const [json, setJson] = useState({
    "stages": ["production", "staging"],
    "providers": {
      "aws": {
        "region": "us-east-2",
        "services": {}
      },
      "gcp": {
        "region": "europe-west9-a",
        "project": "notional-yeti-343410",
        "services": {}
      }
    }
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/services/')
      .then(data => data.json())
      .then(response => {
        setServicesApi(response.data.services)
      })
  }, [])


  const generateJsonFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(json)
    // fetch('http://127.0.0.1:8000/api/tf/', {
    //   method: 'POST',
    //   body: JSON.stringify(json),
    // })
    //   .then(res => res.blob())
    //   .then(blob => saveAs(blob, 'tfmaker.zip'))
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  const updateConfigInJson = (providerName: string, serviceName: any, extras: any, serviceWithConfig: any, serviceId: any) => {
    // @ts-ignore
    setJson((prevState) => ({
      ...prevState,
      providers: {
        ...prevState.providers,
        [providerName]: {
          // @ts-ignore
          ...prevState.providers[providerName],
          services: {
            // @ts-ignore
            ...prevState.providers[providerName].services,
            // @ts-ignore
            [serviceName]: changeConfigObject(prevState.providers[providerName].services[serviceName], serviceWithConfig, serviceId),

          }
        }
      }
    }))
  }

  const changeConfigObject = (arr: any, newObject: any, id: any) => {
    let configObject: any[];

    arr = arr.filter( (obj: { id: any; }) => {
      return obj.id !== id;
    });

    configObject = arr;

    delete newObject.id

    configObject.push(newObject)

    return configObject;
  }

  const updateServiceInJson = (providerName: string, serviceName: any, extras: any, serviceId: any) => {
    let configService: {} = {};

    extras.forEach((config: any) => {
      if (config.name.split('.')[1]) {

        // @ts-ignore
        configService[config.name.split('.')[0]] = {};

      } else {

        // @ts-ignore
        configService[config.name] = (config.default as any ? config.default : '');

      }
    })

    extras.forEach((config: any) => {
      if (config.name.split('.')[1]) {
        // @ts-ignore
        configService[config.name.split('.')[0]][config.name.split('.')[1]] = (config.default as any ? config.default : '');
      }
    })

    const configServiceWithId = { ...configService, id: serviceId };

    // @ts-ignore
    if (serviceName in json.providers[providerName].services) {
      // @ts-ignore
      json.providers[providerName].services[serviceName].push(configServiceWithId)
    } else {
      setJson({...json,
        providers: {
          ...json.providers,
          [providerName]: {
            // @ts-ignore
            ...json.providers[providerName],
            services: {
              // @ts-ignore
              ...json.providers[providerName].services,
              [serviceName]: [
                configServiceWithId
              ],
            }
          }
        }
      })
    }
  };

  const getNodeId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  const onAdd = useCallback(
    (labelNode: any, providerNode: any, tfkeyNode: any, extras: any, serviceId: any) => {
      updateServiceInJson(providerNode, tfkeyNode, extras, serviceId)
      yPos.current += 50;
      const newNode = {
        id: getNodeId(),
        type: "textUpdater",
        data: {
          label: labelNode,
          extras: extras,
          provider: providerNode,
          tf_key: tfkeyNode,
          updateConfigInJson: updateConfigInJson,
          id: serviceId,
        },
        position: {
          x: 250,
          y: yPos.current,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return (
    <React.Fragment>
      <section className="page-project columns">
        <div className="column is-2">
          <Sidebar data={servicesApi} addNodeFunc={onAdd} jsonCurr={json}/>
        </div>
        <div className="column is-10e">
          <div className="p-1 is-flex is-justify-content-space-between is-align-items-center">
            <p>{data.infoProject.name}</p>
            <button
              className="page-project__btnExport button is-link"
              onClick={generateJsonFile}
            >
              Export
            </button>
          </div>
          <OverviewFlow nodes={nodes} onNodesChange={onNodesChange}/>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
