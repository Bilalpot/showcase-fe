import React, { useContext, useEffect } from 'react';
import { AUTH_TOKEN_KEY } from './utils/enums';
import { getMyData } from './api/auth';
import { AuthContext } from './context/auth';

const AppAuthLoader = ({ setIsAppLoading }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!accessToken) {
      setIsAppLoading(false);
      return;
    }
    getMyData()
      .then((user) => {
        if (!user) return;
        authContext.setIsLoggedIn(true);
        authContext.setUserData({ ...user });
      })
      .finally(() => {
        setIsAppLoading(false);
      });
  }, []);

  return <></>;
};

export default AppAuthLoader;
