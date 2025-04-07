import axios from 'axios';


const API = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:5000/api'
    : 'https://flyme-5dxt.onrender.com/api',
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
export const bookFlight = (flightId, data) =>
  API.post('/bookings', { flightId, ...data });
export const getMyBookings = () => API.get('/bookings/me');
export const cancelBooking = (bookingId) => API.delete(`/bookings/${bookingId}`);
export const getLocations = () => API.get("/locations");
