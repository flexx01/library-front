// src/__tests__/AdminNavBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';
import '@testing-library/jest-dom/extend-expect';

describe('AdminNavBar', () => {
  const renderWithRouter = (ui, { route = '/admin' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="admin/*" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders without crashing', () => {
    renderWithRouter(<AdminNavBar />, { route: '/admin' });
    expect(screen.getByText(/Zarządzaj użytkownikami/i)).toBeInTheDocument();
    expect(screen.getByText(/Zarządzaj książkami/i)).toBeInTheDocument();
  });

  it('selects the correct tab based on the route', () => {
    renderWithRouter(<AdminNavBar />, { route: '/admin/books' });
    expect(screen.getByText(/Zarządzaj książkami/i).closest('button')).toHaveClass('Mui-selected');
  });

  it('navigates to the correct route on tab change', () => {
    const { container } = renderWithRouter(
      <AdminNavBar />,
      { route: '/admin' }
    );

    fireEvent.click(screen.getByText(/Zarządzaj książkami/i));

    expect(container.innerHTML).toContain('Zarządzaj książkami');
  });
});
