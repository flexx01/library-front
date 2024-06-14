// src/__tests__/NavigationMenu.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NavigationMenu from '../components/NavigationMenu';
import { AuthContext } from '../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';

const renderWithRouterAndContext = (ui, { providerProps, route = '/' } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <AuthContext.Provider value={providerProps}>
        <Router location={history.location} navigator={history}>
          {ui}
        </Router>
      </AuthContext.Provider>
    ),
    history,
  };
};

describe('NavigationMenu', () => {
  const providerProps = {
    user: { id: 1, role: 'USER', firstName: 'John', lastName: 'Doe' },
  };

  it('renders without crashing', () => {
    renderWithRouterAndContext(<NavigationMenu open={true} toggleDrawer={jest.fn()} />, { providerProps });

    expect(screen.getByText('Główna')).toBeInTheDocument();
    expect(screen.getByText('Przeglądaj Książki')).toBeInTheDocument();
    expect(screen.queryByText('Panel Admina')).not.toBeInTheDocument();
  });

  it('displays admin panel link if user is an admin', () => {
    const adminProviderProps = { user: { id: 1, role: 'ADMIN', firstName: 'Admin', lastName: 'User' } };
    renderWithRouterAndContext(<NavigationMenu open={true} toggleDrawer={jest.fn()} />, { providerProps: adminProviderProps });

    expect(screen.getByText('Panel Admina')).toBeInTheDocument();
  });

  it('displays correct links in mini drawer mode', () => {
    renderWithRouterAndContext(<NavigationMenu open={false} toggleDrawer={jest.fn()} />, { providerProps });

    expect(screen.getByLabelText('Główna')).toBeInTheDocument();
    expect(screen.getByLabelText('Przeglądaj Książki')).toBeInTheDocument();
    expect(screen.queryByLabelText('Panel Admina')).not.toBeInTheDocument();
  });

  it('displays admin panel link if user is an admin in mini drawer mode', () => {
    const adminProviderProps = { user: { id: 1, role: 'ADMIN', firstName: 'Admin', lastName: 'User' } };
    renderWithRouterAndContext(<NavigationMenu open={false} toggleDrawer={jest.fn()} />, { providerProps: adminProviderProps });

    expect(screen.getByLabelText('Panel Admina')).toBeInTheDocument();
  });

  it('displays opening hours and copyright info', () => {
    renderWithRouterAndContext(<NavigationMenu open={true} toggleDrawer={jest.fn()} />, { providerProps });

    expect(screen.getByText('Godziny otwarcia:')).toBeInTheDocument();
    expect(screen.getByText('Pon-Pt: 8:00 - 20:00')).toBeInTheDocument();
    expect(screen.getByText('Sob: 10:00 - 14:00')).toBeInTheDocument();
    expect(screen.getByText('© 2024 Biblioteka Studentów')).toBeInTheDocument();
  });

  it('navigates to the correct route when a link is clicked', () => {
    const { history } = renderWithRouterAndContext(<NavigationMenu open={true} toggleDrawer={jest.fn()} />, { providerProps });

    fireEvent.click(screen.getByText('Przeglądaj Książki'));
    expect(history.location.pathname).toBe('/books');
  });

  it('shows correct icons', () => {
    renderWithRouterAndContext(<NavigationMenu open={true} toggleDrawer={jest.fn()} />, { providerProps });

    expect(screen.getByTestId('HomeIcon')).toBeInTheDocument();
    expect(screen.getByTestId('BookIcon')).toBeInTheDocument();
    if (providerProps.user.role === 'ADMIN') {
      expect(screen.getByTestId('AdminPanelSettingsIcon')).toBeInTheDocument();
    }
  });
});
