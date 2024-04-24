import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

function App() {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated)
  if (loading) {
    console.log("loading in the app.js")
    return <div>Loading...</div>;
  }

  return (
    <div>

    <nav>
      <ul>
        {!isAuthenticated &&
          <>
            <li>
              <Link to={`register`}>Register</Link>
            </li>
            <li>
              <Link to={`login`}>Login</Link>
            </li>
          </>
        }
        {isAuthenticated &&
          <>
            <li>
              <Link to={`getBooks`}>Books</Link>
            </li>
            <li>
              <Link to={`addBook`}>Upload books</Link>
            </li>
            <li>
              <Link to={`logout`}>Log out</Link>
            </li>
          </>
        }
      </ul>
    </nav>
    </div>
  );
}

export default App;
