import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import './RegisterPage.css';

interface Props {
  switchToLogin?: () => void;
}

const RegisterPage = ({ switchToLogin }: Props) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [language, setLanguage] = useState('English')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    register({
      username,
      email,
      firstName,
      lastName,
      phone,
      language,
      password,
    })
    navigate('/');
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title flex items-center justify-center gap-2">
          <UserPlus size={24} /> Register
        </h1>
        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="name-row">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <Input
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <select
          className="language-select"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        {error && <p className="login-error">{error}</p>}
        <Button type="submit" className="login-button">Sign Up</Button>
        {switchToLogin && (
          <p className="switch-text">
            Already have an account?{' '}
            <span className="switch-link" onClick={switchToLogin}>
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
