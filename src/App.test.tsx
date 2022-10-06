import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// import Sum from '../src/components/ServiceNode/sum.test'

const Sum = (a:number, b:number) => {
  return a + b;
}
test('adds 1 + 2 to equal 3', () => {
    expect(Sum(1, 2)).toBe(3);
  });
