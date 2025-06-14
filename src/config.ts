export const SERVICE_URLS = {
  auth: 'http://localhost:3002',
  services: 'http://localhost:3003',
  bookings: 'http://localhost:3004',
  designers: 'http://localhost:3005',
  transactions: 'http://localhost:3006',
  reviews: 'http://localhost:3007',
  gallery: 'http://localhost:3008'
} as const;

export type ServiceKey = keyof typeof SERVICE_URLS;
