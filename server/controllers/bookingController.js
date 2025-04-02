import Flight from '../models/Flight.js'; 

export const createBooking = async (req, res) => {
  const { flightId } = req.body;

  try {
    // Validar si ya reservó
    const existing = await Booking.findOne({ user: req.user.userId, flight: flightId });
    if (existing) {
      return res.status(400).json({ message: 'Ya reservaste este vuelo' });
    }

    // Buscar vuelo
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }

    // Validar asientos disponibles
    if (flight.seatsAvailable <= 0) {
      return res.status(400).json({ message: 'No hay asientos disponibles' });
    }

    // Crear reserva
    const newBooking = await Booking.create({
      user: req.user.userId,
      flight: flightId,
    });

    // Restar un asiento y guardar
    flight.seatsAvailable -= 1;
    await flight.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};
