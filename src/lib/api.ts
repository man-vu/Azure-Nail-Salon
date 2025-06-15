import { API_GATEWAY_URL } from '@/config';

const APIM_SUBSCRIPTION_KEY = "ddf4f8c73613441fa3b246d5c4662ac6"; // <--- your key

function getBaseUrl(_path: string): string {
  return API_GATEWAY_URL;
}

export function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth-token');
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Ocp-Apim-Subscription-Key": APIM_SUBSCRIPTION_KEY, // <--- always include
  } as HeadersInit;

  const base = getBaseUrl(path);
  return fetch(`${base}${path}`, { ...options, headers });
}
