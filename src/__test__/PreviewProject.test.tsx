import React from "react";
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { render, screen } from "@testing-library/react";

import  PreviewProject  from '../components/PreviewProject';

type Props = {
    data: Data
}

type Data = {
    id: string
    name: string
}

const mockProps = {
    id: "1234",
    name: "Project 1"
}

describe("ServiceNode", () => {
    it("displays ami name", () => {
      render(
      <ReactFlowProvider>
          <PreviewProject data={mockProps}/>
      </ReactFlowProvider>);

      expect(screen.getByText("Edit Service")).toBeInTheDocument();
    //   expect(screen.getByText("AWS")).toBeInTheDocument();
    });
  });