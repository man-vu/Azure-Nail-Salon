/**
 * Base URL for the API gateway.
 *
 * When building with Vite, environment variables prefixed with `VITE_` are
 * exposed on `import.meta.env`. This allows switching between development and
 * production deployments without changing the source code.
 */
export const API_GATEWAY_URL =
  (import.meta.env.VITE_API_GATEWAY_URL as string) || 'http://localhost:3001';
