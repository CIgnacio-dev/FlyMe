// controllers/flightController.js
import Flight from '../models/Flight.js';

// Obtener todos los vuelos
// Obtener todos los vuelos con filtros
export const getFlights = async (req, res) => {
    try {
      const { origin, destination, departureDate, minPrice, maxPrice } = req.query;
  
      const filters = {};
  
      if (origin) {
        filters.origin = { $regex: new RegExp(origin, 'i') }; // búsqueda flexible
      }
  
      if (destination) {
        filters.destination = { $regex: new RegExp(destination, 'i') };
      }
  
      if (departureDate) {
        // Buscar vuelos que salgan ese día (sin importar la hora)
        const start = new Date(departureDate);
        const end = new Date(departureDate);
        end.setHours(23, 59, 59, 999);
  
        filters.departureDate = { $gte: start, $lte: end };
      }
  
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
      }
  
      const flights = await Flight.find(filters);
      res.json(flights);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Nuevo vuelo
export const createFlight = async (req, res) => {
  const {
    airline,
    origin,
    destination,
    departureDate,
    arrivalDate,
    price,
    seatsAvailable
  } = req.body;

  try {
    const newFlight = new Flight({
      airline,
      origin,
      destination,
      departureDate,
      arrivalDate,
      price,
      seatsAvailable
    });

    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener vuelo por ID
export const getFlightById = async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
  
      if (!flight) {
        return res.status(404).json({ message: 'Vuelo no encontrado' });
      }
  
      res.json(flight);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Eliminar vuelo por ID
export const deleteFlight = async (req, res) => {
    try {
      const flight = await Flight.findByIdAndDelete(req.params.id);
  
      if (!flight) {
        return res.status(404).json({ message: 'Vuelo no encontrado' });
      }
  
      res.json({ message: 'Vuelo eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Editar vuelo por ID
export const updateFlight = async (req, res) => {
    try {
      const updatedFlight = await Flight.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedFlight) {
        return res.status(404).json({ message: 'Vuelo no encontrado' });
      }
  
      res.json(updatedFlight);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  