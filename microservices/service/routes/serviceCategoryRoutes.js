import express from 'express';
import { listServiceCategories } from '../services/serviceCategoryService.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const categories = await listServiceCategories();
  res.json(categories);
});

export default router;
