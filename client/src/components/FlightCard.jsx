import { Box, Text, Badge, Stack, Button, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { bookFlight } from "../services/api";
import { Link } from "react-router-dom";

const FlightCard = ({ flight, userBookings = [] }) => {
  const { user } = useAuth();
  const toast = useToast();

  const yaReservado = userBookings.some(
    (booking) => booking.flight._id === flight._id
  );

  const handleReserve = async () => {
    try {
      await bookFlight(flight._id);
      toast({
        title: "¡Reserva confirmada!",
        description: `Reservaste el vuelo de ${flight.origin} a ${flight.destination}`,
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      const msg = error.response?.data?.message;
      toast({
        title: "No se pudo reservar",
        description:
          msg === "Ya reservaste este vuelo"
            ? msg
            : "Ocurrió un error inesperado",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
      <Stack spacing={2}>
        <Text fontSize="xl" fontWeight="bold">
          {flight.origin} → {flight.destination}
        </Text>
        <Text>✈️ {flight.airline}</Text>
        <Text>🕓 Salida: {format(new Date(flight.departureDate), "PPpp")}</Text>
        <Text>🕓 Llegada: {format(new Date(flight.arrivalDate), "PPpp")}</Text>
        <Badge colorScheme="green">USD ${flight.price}</Badge>
        <Text>🪑 Asientos: {flight.seatsAvailable}</Text>
        <Link to={`/vuelos/${flight._id}`}>
          <Button colorScheme="blue" mt={3} size="sm">
            Ver detalles
          </Button>
        </Link>
        {user && (
          <Button
            colorScheme={yaReservado ? "gray" : "teal"}
            size="sm"
            onClick={handleReserve}
            isDisabled={yaReservado}
          >
            {yaReservado ? "Ya reservado" : "Reservar"}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default FlightCard;
