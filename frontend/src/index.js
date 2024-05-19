import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from "react-router-dom";
import './styles/input.css';
import App from './components/App';
import { AuthProvider } from './utils/authContext';
import { NotificationProvider } from './utils/notificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);