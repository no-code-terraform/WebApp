import React from "react";
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { render, screen } from "@testing-library/react";

import  OverviewFlow  from '../components/Dropdown';

describe("ServiceNode", () => {
    it("displays something", () => {
      render(
      <ReactFlowProvider>
          <OverviewFlow />
      </ReactFlowProvider>);

      expect(screen.getByText("Dropdown button")).toBeInTheDocument();
      expect(screen.getByText("Dropdown item")).toBeInTheDocument();
    });
  });