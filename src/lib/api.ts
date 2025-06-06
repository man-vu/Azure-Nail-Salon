import { API_BASE_URL } from '@/config';

export function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth-token');
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as HeadersInit;

  return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
}
