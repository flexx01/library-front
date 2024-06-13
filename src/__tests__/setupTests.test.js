// src/__tests__/setupTests.test.js

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Dummy component to test jest-dom matchers
const DummyComponent = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <button>Click me</button>
      <input type="checkbox" defaultChecked />
    </div>
  );
};

describe('jest-dom matchers', () => {
  beforeEach(() => {
    render(<DummyComponent />);
  });

  test('checks if element has correct text content', () => {
    expect(screen.getByText('Hello, world!')).toHaveTextContent('Hello, world!');
  });

  test('checks if button is in the document', () => {
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('checks if checkbox is checked', () => {
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('checks if element does not have text content', () => {
    expect(screen.getByText('Hello, world!')).not.toHaveTextContent('Goodbye, world!');
  });
});
