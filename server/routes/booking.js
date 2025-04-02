// server/routes/bookings.js
import express from 'express';
import protect from '../middlewares/authMiddlewares.js';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

// Requiere logearse
router.post('/', protect, createBooking);
router.get('/me', protect, getMyBookings);

export default router;
