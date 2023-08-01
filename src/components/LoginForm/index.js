import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { SIGN_UP_ROUTE } from '../../utils/routes';
import React from 'react';
import { emailRegex } from '../../utils';

const LoginForm = ({ onSubmit, loading }) => {
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{ minWidth: 400 }}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <h3>Login</h3>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            pattern: emailRegex,
            message: 'Please input a valid email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form.Item>
      Don't have an account? <Link to={SIGN_UP_ROUTE}>Sign Up</Link>
    </Form>
  );
};

export default React.memo(
  LoginForm,
  (prevProps, nextProps) => prevProps.loading === nextProps.loading
);
