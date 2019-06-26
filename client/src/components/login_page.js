import React from 'react';
import LoginForm from './login_form';


const LoginPage = ({ onLoginSuccess }) => (
  <div className="container login-form-container">
    <img className="logo-big" alt="logo" src="https://res.cloudinary.com/dmzwcfe2e/image/upload/v1561542202/logo_transparent.png" />
    <div className="slogan text-center">Review your colleagues</div>
    <LoginForm onLoginSuccess={onLoginSuccess} />
  </div>
);

export default LoginPage;
