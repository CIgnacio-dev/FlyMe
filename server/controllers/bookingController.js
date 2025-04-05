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
    const { flightId, seatNumber, passengerName, passengerEmail } = req.body;
  
    try {
      const existing = await Booking.findOne({ user: req.user.userId, flight: flightId });
      if (existing) {
        return res.status(400).json({ message: 'Ya reservaste este vuelo' });
      }
  
      const flight = await Flight.findById(flightId);
      if (!flight) return res.status(404).json({ message: 'Vuelo no encontrado' });
  
      const seat = flight.seats.find((s) => s.number === seatNumber);
      if (!seat) return res.status(400).json({ message: 'Asiento inválido' });
      if (seat.reserved) return res.status(400).json({ message: 'Asiento ya reservado' });
  
      // Marcar asiento como reservado
      seat.reserved = true;
      flight.seatsAvailable -= 1;
      await flight.save();
  
      const newBooking = await Booking.create({
        user: req.user.userId,
        flight: flightId,
        seatNumber,
        passengerName,
        passengerEmail,
      });
  
      res.status(201).json(newBooking);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al crear la reserva', error });
    }
  };

export const cancelBooking = async (req, res) => {
    const bookingId = req.params.id;
  
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
  
      // Buscar el vuelo relacionado
      const flight = await Flight.findById(booking.flight);
      if (flight) {
        const seat = flight.seats.find(s => s.number === booking.seatNumber);
        if (seat) {
          seat.reserved = false;
          seat.passengerName = '';
          seat.passengerEmail = '';
          flight.seatsAvailable += 1;
          await flight.save();
        }
      }
  
      // Eliminar la reserva
      await booking.deleteOne();
  
      res.json({ message: "Reserva cancelada y asiento liberado" });
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      res.status(500).json({ message: "Error al cancelar la reserva" });
    }
  };
  
  
