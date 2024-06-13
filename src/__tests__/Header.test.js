// src/__tests__/Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import { AuthProvider, AuthContext } from '../context/AuthContext';

jest.mock('axios'); // Mockowanie axios

const renderWithProviders = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </AuthContext.Provider>,
    renderOptions
  );
};

test('renders Header component with user logged in', () => {
  const providerProps = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    logout: jest.fn()
  };

  act(() => {
    renderWithProviders(<Header toggleDrawer={() => {}} />, { providerProps });
  });

  expect(screen.getByText('Biblioteka Studentów')).toBeInTheDocument();
  expect(screen.getByText('John')).toBeInTheDocument();
});

test('renders Header component with user logged out', () => {
  const providerProps = {
    user: null,
    logout: jest.fn()
  };

  act(() => {
    renderWithProviders(<Header toggleDrawer={() => {}} />, { providerProps });
  });

  expect(screen.getByText('Biblioteka Studentów')).toBeInTheDocument();
  expect(screen.getByText('Zaloguj się')).toBeInTheDocument();
});

test('opens menu when user clicks on the button', () => {
  const providerProps = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    logout: jest.fn()
  };

  act(() => {
    renderWithProviders(<Header toggleDrawer={() => {}} />, { providerProps });
  });

  act(() => {
    fireEvent.click(screen.getByText('John'));
  });

  expect(screen.getByText('Ustawienia Profilu')).toBeInTheDocument();
  expect(screen.getByText('Wyloguj się')).toBeInTheDocument();
});

test('logs out user when clicking on logout button', async () => {
  const providerProps = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    logout: jest.fn()
  };

  await act(async () => {
    renderWithProviders(<Header toggleDrawer={() => {}} />, { providerProps });
  });

  await act(async () => {
    fireEvent.click(screen.getByText('John'));
  });

  await act(async () => {
    fireEvent.click(screen.getByText('Wyloguj się'));
  });

  expect(providerProps.logout).toHaveBeenCalled();
});
