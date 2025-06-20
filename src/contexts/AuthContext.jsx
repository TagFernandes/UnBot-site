import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyLogin } from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);
      const isLoggedIn = await verifyLogin();
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const login = (token, matricula) => {
    document.cookie = `UserSession=${token}; path=/; max-age=604800`;
    document.cookie = `MatriculaSigaaBot=${matricula}; path=/; max-age=604800`;
    console.log('UserSession cookie set with username:', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    document.cookie = "UserSession=; Max-Age=0; path=/;"; // Remove o cookie
    document.cookie = "MatriculaSigaaBot=; Max-Age=0; path=/;"; // Remove o cookie
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
