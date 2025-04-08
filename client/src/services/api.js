import axios from 'axios';


const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
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
console.log("Axios BaseURL:", API.defaults.baseURL);

export const getFlights = () => API.get('/flights');
export const bookFlight = (flightId, data) =>
  API.post('/bookings', { flightId, ...data });
export const getMyBookings = () => API.get('/bookings/me');
export const cancelBooking = (bookingId) => API.delete(`/bookings/${bookingId}`);
export const getLocations = () => API.get("/locations");
