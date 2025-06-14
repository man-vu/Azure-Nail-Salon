import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.AUTH_PORT || 3002;
app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
