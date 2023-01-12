import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders', () => {
  render(<App />);
  const element = screen.getByText(/MQTT Stream Data/i);
  expect(element).toBeInTheDocument();
});
