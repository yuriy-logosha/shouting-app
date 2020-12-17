import { render, screen } from '@testing-library/react';
import Table from './Table';
import React from "react";

test('renders table', () => {
  render(<Table hits={[{'x':1, y:1}, {'x':100, y:200}]}/>);
  expect(screen.getByText(/1 x 1/i)).toBeInTheDocument();
  expect(screen.getByText(/100 x 200/i)).toBeInTheDocument();
});
