// contexts/AuthContext.tsx
import React, {createContext, useEffect, useState, useContext} from 'react';
import {setToken, getToken} from './storage';

const AuthContext = createContext({
  isAuth: false,
  login: token => {},
  logout: () => {},
});

export function AuthProvider({children}) {
  const [isAuth, setAuth] = useState(false);

  const login = async token => {
    await setToken(token);
    setAuth(true);
  };

  const logout = async () => {
    await setToken('');
    setAuth(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getToken();
      console.log('token:', token);
      setAuth(!!token);
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{isAuth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
