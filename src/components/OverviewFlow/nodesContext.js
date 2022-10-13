import { createContext } from "react";

const nodesContext = createContext({
  nodes: any,
  changeNodes: (nodes) => {}
});

export default nodesContext;

