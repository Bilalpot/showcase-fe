import React from 'react';

import { Outlet } from 'react-router-dom';

import classes from './Auth.module.css';

const Auth = () => {
  return (
    <div className={classes.auth_page}>
      <div className={classes.auth_component}>
        <h3>Welcome to Showcase!</h3>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
