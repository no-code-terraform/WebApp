import React from "react";
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { render } from "@testing-library/react";

import  OverviewFlow  from '../components/OverviewFlow';

type Data = {
    props: any
}

const mockProps = {
    props: "pouet"
}

describe("ServiceNode", () => {
    it("displays something", () => {
      render(
      <ReactFlowProvider>
          <OverviewFlow data={mockProps}/>
      </ReactFlowProvider>);

    //   expect(screen.getByText("pouet")).toBeInTheDocument();
    //   expect(screen.getByText("AWS")).toBeInTheDocument();
    });
  });