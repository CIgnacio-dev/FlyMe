// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { getFlights, getMyBookings } from '../services/api';
import FlightCard from "../components/FlightCard";
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userBookings, setUserBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const flightsRes = await getFlights();
        setFlights(flightsRes.data);
  
        if (user) {
          const bookingsRes = await getMyBookings();
          setUserBookings(bookingsRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchAll();
  }, [user]);
  

  return (
    <Box p={5}>
      <Heading mb={4}>Vuelos disponibles ✈️</Heading>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {flights.map((flight) => (
            <FlightCard
              key={flight._id}
              flight={flight}
              userBookings={userBookings}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Home;
