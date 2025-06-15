import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));

const location = process.env.AZURE_LOCATION || 'westus2';
const prod = process.env.NODE_ENV === 'production';

const services = {
  auth:
    process.env.AUTH_URL ||
    (prod
      ? `http://auth-cg.${location}.azurecontainer.io:3002`
      : 'http://localhost:3002'),
  services:
    process.env.SERVICE_URL ||
    (prod
      ? `http://service-cg.${location}.azurecontainer.io:3003`
      : 'http://localhost:3003'),
  bookings:
    process.env.BOOKING_URL ||
    (prod
      ? `http://booking-cg.${location}.azurecontainer.io:3004`
      : 'http://localhost:3004'),
  designers:
    process.env.DESIGNER_URL ||
    (prod
      ? `http://designer-cg.${location}.azurecontainer.io:3005`
      : 'http://localhost:3005'),
  transactions:
    process.env.TRANSACTION_URL ||
    (prod
      ? `http://transaction-cg.${location}.azurecontainer.io:3006`
      : 'http://localhost:3006'),
  reviews:
    process.env.REVIEW_URL ||
    (prod
      ? `http://review-cg.${location}.azurecontainer.io:3007`
      : 'http://localhost:3007'),
  gallery:
    process.env.GALLERY_URL ||
    (prod
      ? `http://gallery-cg.${location}.azurecontainer.io:3008`
      : 'http://localhost:3008'),
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
