import React, { useCallback, useContext, useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { login } from '../../api/auth';
import { message } from 'antd';
import { AuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { EDUCATIONS_ROUTE } from '../../utils/routes';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, messageContext] = message.useMessage();

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const userData = await login(data);
      authContext.setUserData({ ...userData });
      authContext.setIsLoggedIn(true);
      navigate(EDUCATIONS_ROUTE, { replace: true });
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {messageContext}
      <LoginForm loading={isLoading} onSubmit={onLogin} />
    </>
  );
};

export default Login;
