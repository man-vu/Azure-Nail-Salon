import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import './LoginPage.css';

interface Props {
  switchToRegister?: () => void;
}

const LoginPage = ({ switchToRegister }: Props) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(identifier, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title flex items-center justify-center gap-2">
          <LogIn size={24} /> Login
        </h1>
        <Input
          placeholder="Email, Username or Phone"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="login-error">{error}</p>}
        <Button type="submit" className="login-button">Sign In</Button>
        {switchToRegister && (
          <p className="switch-text">
            Not signed up yet?{' '}
            <span className="switch-link" onClick={switchToRegister}>
              Register
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
