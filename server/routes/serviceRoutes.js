import express from 'express';
import { listServices, listDesignersForService } from '../services/serviceService.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  console.log('Fetching all services');
  const services = await listServices();
  res.json(services);
});

router.get('/:id/designers', async (req, res) => {
  const designers = await listDesignersForService(req.params.id);
  if (!designers) {
    return res.status(404).json({ error: 'Service not found' });
  }
  res.json(designers);
});

export default router;
