// routes/flights.js
import express from 'express';
import { getFlights, createFlight, getFlightById, deleteFlight, updateFlight } from '../controllers/flightController.js';


const router = express.Router();

router.get('/', getFlights);
router.post('/', createFlight);
router.get('/:id', getFlightById);
router.put('/:id', updateFlight); 
router.delete('/:id', deleteFlight);

export default router;
