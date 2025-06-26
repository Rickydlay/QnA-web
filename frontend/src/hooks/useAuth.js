import { useState, useEffect } from 'react';
import api from 'api';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user);
        } catch (err) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []); // Initial fetch

  // Function to refresh user manually
  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await api.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login'; // Fixed typo and added window check
    }
  };

  return { user, handleLogout, refreshUser }; // Expose refreshUser
};