import { useState } from 'react';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  return mode === 'login' ? (
    <LoginPage switchToRegister={() => setMode('register')} />
  ) : (
    <RegisterPage switchToLogin={() => setMode('login')} />
  );
};

export default AuthPage;
