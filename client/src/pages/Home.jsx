// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import { getFlights } from '../services/api';
import FlightCard from '../components/FlightCard';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getFlights();
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Vuelos disponibles ✈️</Heading>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {flights.map(flight => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Home;
