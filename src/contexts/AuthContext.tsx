import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  language: string
}

interface AuthResult {
  success: boolean
  message?: string
}

interface AuthContextProps {
  user: User | null;
  login: (identifier: string, password: string) => Promise<AuthResult>;
  register: (data: User & { password: string }) => Promise<AuthResult>;
  logout: () => void;
}

import { apiFetch } from '@/lib/api';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      apiFetch('/auth/me')
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data) {
            setUser(data);
            localStorage.setItem('auth-user', JSON.stringify(data));
          } else {
            localStorage.removeItem('auth-token');
          }
        })
        .catch(() => localStorage.removeItem('auth-token'));
    }
  }, []);

  const login = async (
    identifier: string,
    password: string
  ): Promise<AuthResult> => {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    if (!res.ok) {
      let message = 'Invalid credentials';
      try {
        const err = await res.json();
        message = err.error || err.errors?.[0]?.msg || message;
      } catch {
        // ignore json parse errors
      }
      return { success: false, message };
    }
    const { token } = await res.json();
    localStorage.setItem('auth-token', token);
    const meRes = await apiFetch('/auth/me');
    if (!meRes.ok) {
      return { success: false, message: 'Failed to fetch user' };
    }
    const data = await meRes.json();
    setUser(data);
    localStorage.setItem('auth-user', JSON.stringify(data));
    return { success: true };
  };

  const register = async (
    data: User & { password: string }
  ): Promise<AuthResult> => {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      let message = 'Registration failed';
      try {
        const err = await res.json();
        message = err.error || err.errors?.[0]?.msg || message;
      } catch {
        // ignore json parse errors
      }
      return { success: false, message };
    }
    return login(data.email || data.username, data.password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
