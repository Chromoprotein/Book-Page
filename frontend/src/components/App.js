import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../utils/useAuth';
import LoggedInFrontPage from './LoggedInFrontPage';
import LoggedOutFrontPage from './LoggedOutFrontPage';

function App() {

  const { isAuthenticated, loading } = useAuth();
  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    <div className="bg-teal-200 pb-4">
      <Navbar />
      {isAuthenticated ? <LoggedInFrontPage/> : <LoggedOutFrontPage />}
    </div>
  );
}

export default App;
