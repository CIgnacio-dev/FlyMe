// routes/flights.js
import express from 'express';
import { getFlights, createFlight, getFlightById, deleteFlight, updateFlight } from '../controllers/flightController.js';
import protect from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/', getFlights);
router.post('/', protect, createFlight);
router.get('/:id', getFlightById);
router.put('/:id', protect, updateFlight); 
router.delete('/:id', protect, deleteFlight);


export default router;
