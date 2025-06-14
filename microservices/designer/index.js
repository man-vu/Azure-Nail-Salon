import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import designerRoutes from './routes/designerRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/designers', designerRoutes);

const PORT = process.env.DESIGNER_PORT || 3005;
app.listen(PORT, () => {
  console.log(`Designer service listening on port ${PORT}`);
});
