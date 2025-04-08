// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import flightRoutes from './routes/flights.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import locationRoutes from './routes/locations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Solicitudes desde cualquier origen
app.use(cors());

app.use(express.json());
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/locations', locationRoutes);

// DB connection
connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
