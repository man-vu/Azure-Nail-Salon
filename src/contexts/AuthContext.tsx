import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  language: string
}

interface AuthContextProps {
  user: User | null;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (data: User & { password: string }) => Promise<boolean>;
  logout: () => void;
}

import { API_BASE_URL } from '@/config';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
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

  const login = async (identifier: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    if (!res.ok) return false;
    const { token } = await res.json();
    localStorage.setItem('auth-token', token);
    const meRes = await fetch(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!meRes.ok) return false;
    const data = await meRes.json();
    setUser(data);
    localStorage.setItem('auth-user', JSON.stringify(data));
    return true;
  };

  const register = async (data: User & { password: string }) => {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) return false;
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
