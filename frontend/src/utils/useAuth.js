// This page is for testing client-side authentication

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  // Initialize isAuthenticated from sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_STATUS_URI, { withCredentials: true });
        const isAuthenticated = response.data.isAuthenticated;
        setIsAuthenticated(isAuthenticated);
        sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
        sessionStorage.setItem('isAuthenticated', 'false');
      } finally {
        setLoading(false);
      }
    };

    // Only run the check if isAuthenticated is not defined
    if (sessionStorage.getItem('isAuthenticated') === null) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);  // Empty dependency array means this runs once on component mount

  return { isAuthenticated, loading };
};
