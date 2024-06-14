// src/__tests__/Footer.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Footer';

test('renders Footer component with opening hours', () => {
  act(() => {
    render(<Footer />);
  });
  expect(screen.getByText('Godziny otwarcia: Pon-Pt 8:00 - 20:00, Sob 10:00 - 14:00')).toBeInTheDocument();
});

test('renders Footer component with copyright', () => {
  act(() => {
    render(<Footer />);
  });
  expect(screen.getByText('© 2024 Biblioteka Studentów')).toBeInTheDocument();
});
