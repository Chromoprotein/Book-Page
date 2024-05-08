import React from 'react';
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import Books from './Books';
import AddBook from './AddBook';
import Details from './Details';
import Logout from './Logout';
import '../styles/input.css';
import ErrorPage from './ErrorPage';
import LoggedOutFrontPage from './LoggedOutFrontPage';
import LoggedInFrontPage from './LoggedInFrontPage';
import NavbarFooter from './NavbarFooter';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/authContext';

function RequireAuth({ children, redirectTo }) {

  const { isAuthenticated, loading } = useAuth();

  console.log("requireAuth" + isAuthenticated)
  if (loading) {
    console.log("loading in the route check")
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;

}

function App() {

  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("App " + isAuthenticated)

  return (
    <NavbarFooter>
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <LoggedInFrontPage /> : <LoggedOutFrontPage />}
      />   
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route
        path="getBooks"
        element={
          <RequireAuth redirectTo="/login">
            <Books />
          </RequireAuth>
        }
      />
      <Route
        path="details/:id"
        element={
          <RequireAuth redirectTo="/login">
            <Details />
          </RequireAuth>
        }
      />
      <Route
        path="addBook"
        element={
          <RequireAuth redirectTo="/login">
            <AddBook />
          </RequireAuth>
        }
      />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
    </NavbarFooter>
  );
}

export default App;
