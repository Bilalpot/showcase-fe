import React, { useContext } from 'react';

import classes from './Education.module.css';
import { AuthContext } from '../../context/auth';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/routes';
import EducationsTable from '../../components/EducationsTable';

const Education = () => {
  const { userData, clear } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    clear();
    navigate(LOGIN_ROUTE);
  };

  return (
    <div className={classes.education_page}>
      <div className={classes.education_page_header}>
        <div>Welcome, {userData.fullName}!</div>
        <Button onClick={onLogout}>Logout</Button>
      </div>
      <div className={classes.education_table}>
        <EducationsTable />
      </div>
    </div>
  );
};

export default Education;
