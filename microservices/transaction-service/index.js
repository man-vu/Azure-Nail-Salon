import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/transactions', transactionRoutes);

const PORT = process.env.TRANSACTION_PORT || 3006;
app.listen(PORT, () => {
  console.log(`Transaction service listening on port ${PORT}`);
});
