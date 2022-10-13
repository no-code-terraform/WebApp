import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import OverviewFlow from "../../components/OverviewFlow";
import "bulma/css/bulma.min.css";
import "./index.scss";
import {addEdge, applyNodeChanges, useEdgesState, useNodesState} from "reactflow";
import {saveAs} from "file-saver";

const Index = (): JSX.Element => {
  const location = useLocation();
  const data: any = location.state;
  const yPos = useRef(250);
  const xPos = useRef(0);
  const [nodes, setNodes] = useNodesState(data.infoProject.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [servicesApi, setServicesApi] = useState([]);
  const [json, setJson] = useState({
    "stages": ["production", "staging"],
    "providers": {
      "aws": {
        "region": "us-east-2",
        "services": {}
      },
      "gcp": {
        "region": "us-central1-c",
        "project": "axial-chemist-345114",
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
    fetch('http://127.0.0.1:8000/api/tf/', {
      method: 'POST',
      body: JSON.stringify(removeIdKeys(json)),
    })
      .then(res => res.blob())
      .then(blob => saveAs(blob, 'tfmaker.zip'))
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeIdKeys = (object: { [x: string]: any; stages?: string[]; providers?: { aws: { region: string; services: {}; }; gcp: { region: string; project: string; services: {}; }; }; }) => {
    for (let key in object) {
      for (let secondKey in object[key]) {
        for (let thirdKey in object[key][secondKey]) {
          for (let fourKey in object[key][secondKey][thirdKey]) {
            if (Array.isArray(object[key][secondKey][thirdKey][fourKey])) {
              // @ts-ignore
              object[key][secondKey][thirdKey][fourKey] = object[key][secondKey][thirdKey][fourKey].map(({id,...rest}) => ({...rest}))
            }
          }
        }
      }
    }
    return object;
  }

  const updateConfigInJson = (providerName: string, serviceName: any, extras: any, serviceWithConfig: any, serviceId: any) => {
    setJson((prevState: any) => ({
      ...prevState,
      providers: {
        ...prevState.providers,
        [providerName]: {
          ...prevState.providers[providerName],
          services: {
            ...prevState.providers[providerName].services,
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

    configObject.push(newObject)

    return configObject;
  }

  const updateServiceInJson = (providerName: string, serviceName: any, extras: any, serviceId: any) => {
    let configService: any = {};

    extras.forEach((config: any) => {
      if (config.name.split('.')[1]) {
        configService[config.name.split('.')[0]] = {};

      } else {
        configService[config.name] = (config.default as any ? config.default : '');

      }
    })

    extras.forEach((config: any) => {
      if (config.name.split('.')[1]) {
        configService[config.name.split('.')[0]][config.name.split('.')[1]] = (config.default as any ? config.default : '');
      }
    })

    const configServiceWithId = { ...configService, id: serviceId };

    setJson((prevState: any) => ({
      ...prevState,
      providers: {
        ...prevState.providers,
        [providerName]: {
          ...prevState.providers[providerName],
          services: {
            ...prevState.providers[providerName].services,
            [serviceName]: updateService(prevState.providers[providerName].services, configServiceWithId, serviceName)
          }
        }
      }
    }))
  };

  const updateService = (service: any, newService: any, serviceName: any) => {
    if (!service[serviceName]) {
      const array = []
      array.push(newService)
      return array
    } else {
      service[serviceName].push(newService)
      return service[serviceName]
    }
  }

  const getNodeId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  const onAdd = useCallback(
    (labelNode: any, providerNode: any, tfkeyNode: any, extras: any, serviceId: any) => {
      updateServiceInJson(providerNode, tfkeyNode, extras, serviceId)
      xPos.current += 300;
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
          x: xPos.current,
          y: yPos.current,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const updateServiceWithEdges = (params: any) => {
    let nameDefault = '';
    let portDefault = '';
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === params.source) {
          // @ts-ignore
          nameDefault = document.querySelector(`.serviceNode-${node.data.id} input[data-config-name=${node.data.extras[0].name}]`).value;
          // @ts-ignore
          portDefault = document.querySelector(`.serviceNode-${node.data.id} input[data-config-name=${node.data.extras[3].name}]`).value;
        }
        if (node.id === params.target) {
          const configNameDefaultText = document.querySelector(
            `.serviceNode-${node.data.id} [data-config-text='instances']`
          );
          const configNameDefaultInput = document.querySelector(
            `.serviceNode-${node.data.id} input[data-config-name='instances']`
          );

          const configPortDefaultText = document.querySelector(
            `.serviceNode-${node.data.id} [data-config-text='healthChecktarget']`
          );
          const configPortDefaultInput = document.querySelector(
            `.serviceNode-${node.data.id} input[data-config-name='healthChecktarget']`
          );


          // @ts-ignore
          configNameDefaultText.innerHTML = nameDefault;
          // @ts-ignore
          configNameDefaultInput.value = nameDefault;
          // @ts-ignore
          configPortDefaultText.innerHTML = "HTTP:" + portDefault + "/api/healthcheck";
          // @ts-ignore
          configPortDefaultInput.value = "HTTP:" + portDefault + "/api/healthcheck";
        }

        return node;
      })
    );
  }

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
    updateServiceWithEdges(params);
  }, []);

  return (
    <React.Fragment>
      <section className="page-project columns">
        <div style={{ borderRight: "solid"}} className="column is-2">
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
          <OverviewFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}/>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
