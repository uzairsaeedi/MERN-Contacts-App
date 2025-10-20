import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { getToken, getTokenExpiry, clearAuth } from './AuthHelpers';
import AuthContext from './AuthContextValue';

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const expiry = getTokenExpiry();
    if (expiry && expiry <= Date.now()) {
      logout();
    }
    if (expiry) {
      const t = setTimeout(() => logout(), expiry - Date.now());
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally no deps; logout is stable here

  const login = (tokenValue, expiryMs, userObj) => {
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('tokenExpiry', String(expiryMs));
    if (userObj) localStorage.setItem('user', JSON.stringify(userObj));
    setToken(tokenValue);
    setUser(userObj);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = { token, user, login, logout, api };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
