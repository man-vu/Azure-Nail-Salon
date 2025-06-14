import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/bookings', bookingRoutes);

const PORT = process.env.BOOKING_PORT || 3004;
app.listen(PORT, () => {
  console.log(`Booking service listening on port ${PORT}`);
});
