import React from 'react';
import LoginForm from './login_form';

const LoginPage = ({ onLoginSuccess }) => (
  <div className="container">
    <LoginForm onLoginSuccess={onLoginSuccess} />
  </div>
);

export default LoginPage;
