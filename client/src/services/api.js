import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Enviar token automáticamente si existe
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getFlights = () => API.get('/flights');
export const bookFlight = (flightId) => API.post('/bookings', { flightId });
export const getMyBookings = () => API.get('/bookings/me');