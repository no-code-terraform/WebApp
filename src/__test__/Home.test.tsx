import React from "react";
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import { MemoryRouter } from 'react-router-dom';
import 'reactflow/dist/style.css';
import { render, screen } from "@testing-library/react";

import  Home  from '../pages/Home';

describe("Home", () => {
    it("displays HomePage", () => {
      render(
      <ReactFlowProvider>
          <Home />
      </ReactFlowProvider>, {wrapper: MemoryRouter});

      expect(screen.getByText("See the list of projects")).toBeInTheDocument();
      expect(screen.getByText("Tfmaker")).toBeInTheDocument();
    });
  });