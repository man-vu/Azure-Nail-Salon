import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));

const services = {
  auth: process.env.AUTH_URL || 'http://localhost:3002',
  services: process.env.SERVICE_URL || 'http://localhost:3003',
  bookings: process.env.BOOKING_URL || 'http://localhost:3004',
  designers: process.env.DESIGNER_URL || 'http://localhost:3005',
  transactions: process.env.TRANSACTION_URL || 'http://localhost:3006',
  reviews: process.env.REVIEW_URL || 'http://localhost:3007',
  gallery: process.env.GALLERY_URL || 'http://localhost:3008'
};

app.use('/auth', createProxyMiddleware({ target: services.auth, changeOrigin: true }));
app.use('/categories', createProxyMiddleware({ target: services.services, changeOrigin: true }));
app.use('/services', createProxyMiddleware({ target: services.services, changeOrigin: true }));
app.use('/bookings', createProxyMiddleware({ target: services.bookings, changeOrigin: true }));
app.use('/designers', createProxyMiddleware({ target: services.designers, changeOrigin: true }));
app.use('/transactions', createProxyMiddleware({ target: services.transactions, changeOrigin: true }));
app.use('/reviews', createProxyMiddleware({ target: services.reviews, changeOrigin: true }));
app.use('/gallery', createProxyMiddleware({ target: services.gallery, changeOrigin: true }));

const PORT = process.env.GATEWAY_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
