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
const allowedOrigins = ['https://fly-me-git-main-carlos-projects-4811c668.vercel.app'];

// Middlewares
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/locations', locationRoutes);


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
