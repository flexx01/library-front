import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PrivateRoute from "../context/PrivateRoute";
import '@testing-library/jest-dom/extend-expect';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

test('redirects to home page if user is not logged in', () => {
  renderWithRouter(
    <AuthContext.Provider value={{ user: null }}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/private" element={<PrivateRoute />} />
      </Routes>
    </AuthContext.Provider>,
    { route: '/private' }
  );

  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
});

test('redirects to home page if user does not have the required role', () => {
  renderWithRouter(
    <AuthContext.Provider value={{ user: { role: 'user' } }}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/private" element={<PrivateRoute requiredRole="admin" />} />
      </Routes>
    </AuthContext.Provider>,
    { route: '/private' }
  );

  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
});

test('renders child routes if user is logged in and has the required role', () => {
  renderWithRouter(
    <AuthContext.Provider value={{ user: { role: 'admin' } }}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/private" element={<PrivateRoute requiredRole="admin" />}>
          <Route path="/private" element={<div>Private Page</div>} />
        </Route>
      </Routes>
    </AuthContext.Provider>,
    { route: '/private' }
  );

  expect(screen.getByText(/Private Page/i)).toBeInTheDocument();
});

test('renders child routes if user is logged in and no required role is specified', () => {
  renderWithRouter(
    <AuthContext.Provider value={{ user: { role: 'user' } }}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/private" element={<PrivateRoute />}>
          <Route path="/private" element={<div>Private Page</div>} />
        </Route>
      </Routes>
    </AuthContext.Provider>,
    { route: '/private' }
  );

  expect(screen.getByText(/Private Page/i)).toBeInTheDocument();
});
