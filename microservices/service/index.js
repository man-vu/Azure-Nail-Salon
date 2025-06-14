import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serviceRoutes from './routes/serviceRoutes.js';
import categoryRoutes from './routes/serviceCategoryRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/services', serviceRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.SERVICE_PORT || 3003;
app.listen(PORT, () => {
  console.log(`Service catalog listening on port ${PORT}`);
});
