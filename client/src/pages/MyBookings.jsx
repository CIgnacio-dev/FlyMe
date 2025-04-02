import { useEffect, useState } from 'react';
import { Box, Heading, Stack, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { getMyBookings } from '../services/api';
import { format } from 'date-fns';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setBookings(res.data);
      } catch (err) {
        setError('Error al cargar tus reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <Spinner size="xl" mt={10} />;

  if (error) {
    return (
      <Alert status="error" mt={10}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>Mis reservas ✈️</Heading>
      <Stack spacing={4}>
        {bookings.length === 0 ? (
          <Text>No tienes reservas aún.</Text>
        ) : (
          bookings.map((booking) => (
            <Box key={booking._id} p={4} borderWidth={1} borderRadius="md" shadow="md">
              <Text fontWeight="bold">
                {booking.flight.origin} → {booking.flight.destination}
              </Text>
              <Text>Fecha de salida: {format(new Date(booking.flight.departureDate), 'PPpp')}</Text>
              <Text>Aerolínea: {booking.flight.airline}</Text>
              <Text>Reservado el: {format(new Date(booking.createdAt), 'PPpp')}</Text>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default MyBookings;
