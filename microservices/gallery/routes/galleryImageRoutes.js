import express from 'express';
import { listGalleryImages } from '../services/galleryImageService.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const images = await listGalleryImages();
  res.json(images);
});

export default router;
