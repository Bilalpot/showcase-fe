import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (flag) => {},
  userData: {},
  setUserData: (userData) => {},
  clear: () => {},
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const clear = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, clear }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
