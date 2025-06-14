import express from 'express';
import { listDesigners, listDesignerServices, listDesignerSlots } from '../services/designerService.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const designers = await listDesigners();
  res.json(designers);
});

router.get('/:id/services', async (req, res) => {
  const services = await listDesignerServices(req.params.id);
  if (!services) {
    return res.status(404).json({ error: 'Designer not found' });
  }
  res.json(services.map(s => s.Services));
});

router.get('/:id/slots', async (req, res) => {
  const slots = await listDesignerSlots(req.params.id);
  if (!slots) {
    return res.status(404).json({ error: 'Designer not found' });
  }
  res.json(slots);
});

export default router;
