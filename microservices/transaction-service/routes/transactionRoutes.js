import express from 'express';
import { addTransaction, listTransactions } from '../services/transactionService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const transactions = await listTransactions(req.userId);
  res.json(transactions);
});

router.post('/', async (req, res) => {
  try {
    const tx = await addTransaction({ ...req.body, userId: req.userId });
    res.status(201).json(tx);
  } catch (e) {
    res.status(400).json({ error: 'Unable to create transaction' });
  }
});

export default router;
