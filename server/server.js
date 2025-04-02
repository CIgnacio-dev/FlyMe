// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import flightRoutes from './routes/flights.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// DB connection
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// rutas de vuelos 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
