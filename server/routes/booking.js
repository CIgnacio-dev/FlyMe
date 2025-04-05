// server/routes/bookings.js
import express from 'express';
import protect from '../middlewares/authMiddlewares.js';
import { createBooking, getMyBookings, cancelBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Requiere logearse
router.post('/', protect, createBooking);
router.get('/me', protect, getMyBookings);
router.delete('/:id', protect, cancelBooking);

export default router;
