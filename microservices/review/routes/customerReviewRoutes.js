import express from 'express';
import { listCustomerReviews } from '../services/customerReviewService.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const reviews = await listCustomerReviews();
  res.json(reviews);
});

export default router;
