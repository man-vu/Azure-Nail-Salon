import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import galleryRoutes from './routes/galleryImageRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/gallery', galleryRoutes);

const PORT = process.env.GALLERY_PORT || 3008;
app.listen(PORT, () => {
  console.log(`Gallery service listening on port ${PORT}`);
});
