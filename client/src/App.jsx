import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/NavBar';
import MyBookings from './pages/MyBookings';
import FlightDetails from './components/FlightDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mis-reservas" element={<MyBookings />} />
        <Route path="/vuelos/:id" element={<FlightDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
