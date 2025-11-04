import React, { useContext, useState, useMemo } from 'react';

const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const saveUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = userState(saveUser);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify (data));
    setUser(data);
    };

    const logOut = () => {
      localStorage.removeItem('user');
      setUser(null);
      };

    const value = useMemo(() => ({ user,  logIn, logOut }), [user]);
    
    return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>;
    };
    
    export const useAuth = () => useContext(AuthContext);  

