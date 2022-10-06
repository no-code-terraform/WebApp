import React from "react";
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { render, fireEvent, screen } from "@testing-library/react";

import  Index  from '../pages/Project'

describe("ServiceNode", () => {
    it("displays ami name", () => {
      render(
      <ReactFlowProvider>
          <Index/>
      </ReactFlowProvider>);
  
      expect(screen.getByText("Export")).toBeInTheDocument();
    });
  });