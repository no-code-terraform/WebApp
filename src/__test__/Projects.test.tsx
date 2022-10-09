import React from "react";
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import { MemoryRouter } from 'react-router-dom';
import 'reactflow/dist/style.css';
import { render, screen } from "@testing-library/react";

import  Projects  from '../pages/Projects';

describe("Projects", () => {
    it("displays HomePage", () => {
      render(
      <ReactFlowProvider>
          <Projects />
      </ReactFlowProvider>, {wrapper: MemoryRouter});

      expect(screen.getByText("List of projects")).toBeInTheDocument();
      expect(screen.getByText("Project 1")).toBeInTheDocument();
    });
  });