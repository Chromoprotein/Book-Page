import React from 'react';
import { useAuth } from '../utils/useAuth';
import LoggedInFrontPage from './LoggedInFrontPage';
import LoggedOutFrontPage from './LoggedOutFrontPage';
import NavbarFooter from './NavbarFooter';
import { useOutlet } from 'react-router-dom';

function App() {

  const outlet = useOutlet()

  const { isAuthenticated, loading } = useAuth();
  if (loading) {
      return <div>Loading...</div>;
  }

  // If no outlet is rendered, render the landing page
  const placeholder = isAuthenticated ? <LoggedInFrontPage/> : <LoggedOutFrontPage />;

  return (
    <NavbarFooter>
      <div className="py-5">
      <>{outlet || placeholder}</>
      </div>
    </NavbarFooter>
  );
}

export default App;
