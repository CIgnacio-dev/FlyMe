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
    try {
      const flight = new Flight({
        ...req.body,
        seats: generarAsientos(), // genera 12 asientos 
      });
  
      await flight.save();
      res.status(201).json(flight);
    } catch (error) {
      console.error("Error al crear vuelo:", error);
      res.status(500).json({ message: 'Error al crear vuelo', error });
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

// Generador de asientos: 4 filas x 3 columnas 
const generarAsientos = (filas = 4, columnas = ['A', 'B', 'C']) => {
    const seats = [];
    for (let i = 1; i <= filas; i++) {
      for (let col of columnas) {
        seats.push({ number: `${i}${col}`, reserved: false });
      }
    }
    return seats;
  };
  
  