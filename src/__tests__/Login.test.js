import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../screens/Login';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import * as authApi from '../api/authApi';

jest.mock('../api/authApi');

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

test('renders Login component with login form', () => {
  renderWithProviders(<Login />, { providerProps: { login: jest.fn(), fetchUserDetails: jest.fn() }});

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Hasło/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Zaloguj się/i })).toBeInTheDocument();
});

test('renders Login component with registration form', () => {
  renderWithProviders(<Login />, { providerProps: { login: jest.fn(), fetchUserDetails: jest.fn() }});

  fireEvent.click(screen.getByRole('tab', { name: /Zarejestruj się/i }));

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Imię/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Nazwisko/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Numer telefonu/i)).toBeInTheDocument();
  expect(screen.getAllByLabelText(/Hasło/i).length).toBe(2); // Dwa pola hasła
  expect(screen.getByLabelText(/Potwierdź hasło/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Zarejestruj się/i })).toBeInTheDocument();
});

test('displays error when email and password are not provided during login', async () => {
  renderWithProviders(<Login />, { providerProps: { login: jest.fn(), fetchUserDetails: jest.fn() }});

  fireEvent.click(screen.getByRole('button', { name: /Zaloguj się/i }));

  expect(await screen.findByText('Email i hasło są wymagane')).toBeInTheDocument();
});

test('calls login API and updates context on successful login', async () => {
  const mockLogin = jest.fn();
  authApi.login.mockResolvedValue({ token: 'test-token' });

  const providerProps = {
    user: null,
    login: async (data) => {
      await mockLogin(data);
      return { data: { user: { firstName: 'John', lastName: 'Doe' } } };
    },
    fetchUserDetails: jest.fn().mockResolvedValue({ data: { firstName: 'John', lastName: 'Doe' } }),
  };

  // Mock console.log to prevent actual logging
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  renderWithProviders(<Login />, { providerProps });

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: 'password' } });

  fireEvent.click(screen.getByRole('button', { name: /Zaloguj się/i }));

  await waitFor(() => expect(mockLogin).toHaveBeenCalledWith({ token: 'test-token' }));

  // Restore console.log
  consoleLogSpy.mockRestore();
});

test('displays error when registration fields are not filled', async () => {
  renderWithProviders(<Login />, { providerProps: { login: jest.fn(), fetchUserDetails: jest.fn() }});

  fireEvent.click(screen.getByRole('tab', { name: /Zarejestruj się/i }));
  fireEvent.click(screen.getByRole('button', { name: /Zarejestruj się/i }));

  expect(await screen.findByText('Wszystkie pola są wymagane')).toBeInTheDocument();
});

test('calls register API on successful registration', async () => {
  authApi.register.mockResolvedValue({ message: 'Registration successful' });

  // Mock console.log to prevent actual logging
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  renderWithProviders(<Login />, { providerProps: { login: jest.fn(), fetchUserDetails: jest.fn() }});

  fireEvent.click(screen.getByRole('tab', { name: /Zarejestruj się/i }));

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Imię/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Nazwisko/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Numer telefonu/i), { target: { value: '123456789' } });
  fireEvent.change(screen.getAllByLabelText(/Hasło/i)[0], { target: { value: 'password' } });
  fireEvent.change(screen.getAllByLabelText(/Hasło/i)[1], { target: { value: 'password' } });
  fireEvent.change(screen.getByLabelText(/Potwierdź hasło/i), { target: { value: 'password' } });

  fireEvent.click(screen.getByRole('button', { name: /Zarejestruj się/i }));

  await waitFor(() => expect(authApi.register).toHaveBeenCalledWith({
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    phoneNumber: '123456789'
  }));

  // Restore console.log
  consoleLogSpy.mockRestore();
});
