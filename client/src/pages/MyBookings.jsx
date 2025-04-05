import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { getMyBookings } from "../services/api";
import { format } from "date-fns";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Error al cargar tus reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <Spinner size="xl" mt={10} />;
  if (error)
    return (
      <Alert status="error" mt={10}>
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Box p={5}>
      <Heading mb={4}>Mis Reservas</Heading>
      <Stack spacing={4}>
        {bookings.length === 0 ? (
          <Text>No tienes reservas.</Text>
        ) : (
          bookings.map((booking) => (
            <Box
              key={booking._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              shadow="sm"
            >
              <Text fontWeight="bold">
                {booking.flight.origin} → {booking.flight.destination}
              </Text>
              <Text>
                Asiento: <strong>{booking.seatNumber}</strong>
              </Text>
              <Text>
                Nombre: <strong>{booking.passengerName}</strong>
              </Text>
              <Text>
                Email: <strong>{booking.passengerEmail}</strong>
              </Text>
              <Text>
                Reservado el: {format(new Date(booking.createdAt), "PPpp")}
              </Text>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default MyBookings;
