import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));

const location = process.env.AZURE_LOCATION || "westus2";
const prod = process.env.NODE_ENV === "production";

const services = {
  auth: process.env.AUTH_URL,
  services: process.env.SERVICE_URL,
  bookings: process.env.BOOKING_URL,
  designers: process.env.DESIGNER_URL,
  transactions: process.env.TRANSACTION_URL,
  reviews: process.env.REVIEW_URL,
  gallery: process.env.GALLERY_URL,
};

console.log("Gateway microservice target URLs:", services);

app.use(
  "/auth",
  createProxyMiddleware({ target: services.auth, changeOrigin: true })
);
app.use(
  "/categories",
  createProxyMiddleware({ target: services.services, changeOrigin: true })
);
app.use(
  "/services",
  createProxyMiddleware({ target: services.services, changeOrigin: true })
);
app.use(
  "/bookings",
  createProxyMiddleware({ target: services.bookings, changeOrigin: true })
);
app.use(
  "/designers",
  createProxyMiddleware({ target: services.designers, changeOrigin: true })
);
app.use(
  "/transactions",
  createProxyMiddleware({ target: services.transactions, changeOrigin: true })
);
app.use(
  "/reviews",
  createProxyMiddleware({ target: services.reviews, changeOrigin: true })
);
app.use(
  "/gallery",
  createProxyMiddleware({ target: services.gallery, changeOrigin: true })
);

const PORT = process.env.GATEWAY_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
