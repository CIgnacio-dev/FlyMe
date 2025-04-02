import Flight from '../models/Flight.js'; 
import Booking from '../models/Booking.js';

export const getMyBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.userId }).populate('flight');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener reservas', error });
    }
  };
  export const createBooking = async (req, res) => {
    const { flightId } = req.body;
  
    try {
      console.log('➡️ Iniciando creación de reserva');
      console.log('User:', req.user.userId, 'Flight:', flightId);
  
      const existing = await Booking.findOne({ user: req.user.userId, flight: flightId });
      if (existing) {
        return res.status(400).json({ message: 'Ya reservaste este vuelo' });
      }
  
      const flight = await Flight.findById(flightId);
      if (!flight) {
        return res.status(404).json({ message: 'Vuelo no encontrado' });
      }
  
      if (flight.seatsAvailable <= 0) {
        return res.status(400).json({ message: 'No hay asientos disponibles' });
      }
  
      const newBooking = await Booking.create({
        user: req.user.userId,
        flight: flightId,
      });
  
      flight.seatsAvailable -= 1;
      await flight.save();
  
      console.log('✅ Reserva creada correctamente');
      res.status(201).json(newBooking);
    } catch (error) {
      console.log('❌ Error en backend:', error.message);
      res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
    }
  };
  
