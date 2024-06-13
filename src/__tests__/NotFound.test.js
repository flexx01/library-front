import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../screens/NotFound';

describe('NotFound', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - Strona nieznaleziona/i)).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - Strona nieznaleziona/i)).toBeInTheDocument();
    expect(screen.getByText(/Strona której szukasz nie istnieje./i)).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /strony głównej/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
