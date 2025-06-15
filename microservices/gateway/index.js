import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));

// *** Hardcoded service URLs for testing ***
const services = {
  auth: "http://nailsalon-auth-nczp55iaahvco.westus2.azurecontainer.io:3002",
  services: "http://nailsalon-service-cl36oxplemd6a.westus2.azurecontainer.io:3003",
  bookings: "http://nailsalon-booking-5c6ay6xfrdvia.westus2.azurecontainer.io:3004",
  designers: "http://nailsalon-designer-qxh5qunbntmo2.westus2.azurecontainer.io:3005",
  transactions: "http://nailsalon-transaction-XXXXX.westus2.azurecontainer.io:3006",  // TODO: fill in correct FQDN
  reviews: "http://nailsalon-review-XXXXX.westus2.azurecontainer.io:3007",           // TODO: fill in correct FQDN
  gallery: "http://nailsalon-gallery-2tazgvuystalg.westus2.azurecontainer.io:3008",
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
