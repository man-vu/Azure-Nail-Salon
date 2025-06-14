import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reviewRoutes from './routes/customerReviewRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/reviews', reviewRoutes);

const PORT = process.env.REVIEW_PORT || 3007;
app.listen(PORT, () => {
  console.log(`Review service listening on port ${PORT}`);
});
