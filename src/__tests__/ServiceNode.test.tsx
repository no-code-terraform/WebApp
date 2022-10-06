import React from "react";
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { render, fireEvent, screen } from "@testing-library/react";

import { ServiceNode } from '../components/ServiceNode'

describe("ServiceNode", () => {
    it("displays ami name", () => {
      render(
      <ReactFlowProvider>
          <ServiceNode/>
      </ReactFlowProvider>);
  
      expect(screen.getByText("ami: ami-085925f297f89fce1")).toBeInTheDocument();
    });
  });