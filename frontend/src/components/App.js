import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../utils/useAuth';
import LoggedInFrontPage from './LoggedInFrontPage';
import LoggedOutFrontPage from './LoggedOutFrontPage';
import Footer from './Footer';

function App() {

  const { isAuthenticated, loading } = useAuth();
  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    <div className="bg-amber-50">
      <Navbar />
      {isAuthenticated ? <LoggedInFrontPage/> : <LoggedOutFrontPage />}
      <Footer />
    </div>
  );
}

export default App;
