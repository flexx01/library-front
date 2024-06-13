import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../screens/Home';
import { AuthContext } from '../context/AuthContext';

const renderWithProviders = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      {ui}
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('Home', () => {
  it('renders correctly without a user', () => {
    const providerProps = { user: null };
    renderWithProviders(<Home />, { providerProps });

    expect(screen.getByText('Witamy w Bibliotece Studentów')).toBeInTheDocument();
    expect(screen.getByText('Tutaj znajdziesz wszystkie zasoby potrzebne do nauki i badań.')).toBeInTheDocument();
  });

  it('renders correctly with a user', () => {
    const providerProps = { user: { firstName: 'John', lastName: 'Doe' } };
    renderWithProviders(<Home />, { providerProps });

    expect(screen.getByText('Witamy w Bibliotece Studentów')).toBeInTheDocument();
    expect(screen.getByText('Cześć, John! Znajdziesz tutaj wszystkie zasoby potrzebne do nauki i badań.')).toBeInTheDocument();
  });

  it('displays the welcome message based on user presence', () => {
    const { rerender } = renderWithProviders(<Home />, { providerProps: { user: null } });
    
    expect(screen.queryByText('Cześć,')).not.toBeInTheDocument();

    const providerProps = { user: { firstName: 'John', lastName: 'Doe' } };
    rerender(
      <AuthContext.Provider value={providerProps}>
        <Home />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Cześć, John! Znajdziesz tutaj wszystkie zasoby potrzebne do nauki i badań.')).toBeInTheDocument();
  });
});
