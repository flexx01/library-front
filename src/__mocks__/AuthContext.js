// src/context/__mocks__/AuthContext.js
import React from 'react';

const AuthContext = React.createContext();

const mockLogout = jest.fn();

const mockAuthProvider = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  },
  logout: mockLogout
};

const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={mockAuthProvider}>
    {children}
  </AuthContext.Provider>
);

export { AuthContext, AuthProvider, mockLogout };
