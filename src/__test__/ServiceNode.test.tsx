import React from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { render, fireEvent, screen } from "@testing-library/react";

import { ServiceNode } from "../components/ServiceNode";

// data.provider, data.tf_key, data.extras, serviceWithConfig

type Data = {
  provider: Object;
  tf_key: string;
  extras: Array<string>;
  label: string;
};

const mockData: Data = {
  provider: {},
  tf_key: "12345",
  extras: [".AWS", ".GCP", ".Azure"],
  label: "AWS",
};

describe("ServiceNode", () => {
  it("displays ami name", () => {
    render(
      <ReactFlowProvider>
        <ServiceNode data={mockData} />
      </ReactFlowProvider>
    );

    expect(screen.getByText("Edit Service")).toBeInTheDocument();
  });
});
