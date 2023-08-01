import React, { useCallback, useState } from 'react';

import SignUpForm from '../../components/SignUpForm';
import { signUp } from '../../api/auth';
import { LOGIN_ROUTE } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [messageApi, messageContext] = message.useMessage();

  const onSignUp = useCallback(async (data) => {
    setIsLoading(true);
    try {
      await signUp(data);
      messageApi
        .open({
          type: 'success',
          content: 'Account created successfully! You can login now!',
          duration: 2,
        })
        .then(() => {
          navigate(LOGIN_ROUTE, { replace: true });
        });
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
      <SignUpForm onSubmit={onSignUp} loading={isLoading} />
    </>
  );
};

export default SignUp;
