import { SERVICE_URLS } from '@/config';

function getBaseUrl(path: string): string {
  if (path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/me')) {
    return SERVICE_URLS.auth;
  }
  if (path.startsWith('/services') || path.startsWith('/categories')) {
    return SERVICE_URLS.services;
  }
  if (path.startsWith('/bookings')) {
    return SERVICE_URLS.bookings;
  }
  if (path.startsWith('/designers')) {
    return SERVICE_URLS.designers;
  }
  if (path.startsWith('/transactions')) {
    return SERVICE_URLS.transactions;
  }
  if (path.startsWith('/reviews')) {
    return SERVICE_URLS.reviews;
  }
  if (path.startsWith('/gallery')) {
    return SERVICE_URLS.gallery;
  }
  return '';
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
