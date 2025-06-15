import { API_GATEWAY_URL } from '@/config';

function getBaseUrl(_path: string): string {
  return API_GATEWAY_URL;
}

export function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth-token');
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as HeadersInit;

  const base = getBaseUrl(path);
  return fetch(`${base}${path}`, { ...options, headers });
}
