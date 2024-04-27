import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import App from './components/App';
import Books from './components/Books';
import AddBook from './components/AddBook';
import Details from './components/Details';
import Logout from './components/Logout';
import { useAuth } from './utils/useAuth';
import './styles/input.css';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">        
      <Route index element={<App />} />
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
        path="getBooks/details/:id"
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
    </Route>
  )
);

// A version of authentication that has loading and navigation
// For protecting routes
function RequireAuth({ children, redirectTo }) {

  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    console.log("loading in the route check")
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);