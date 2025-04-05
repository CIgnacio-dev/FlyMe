import { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  useToast,
  Icon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { getMyBookings, cancelBooking } from "../services/api";
import { format } from "date-fns";
import { FaPlaneDeparture, FaUser, FaChair, FaTrashAlt } from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openCancelDialog = (booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(selectedBooking._id);
      toast({
        title: "Reserva cancelada",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      fetchBookings(); // refrescar
    } catch (err) {
      toast({
        title: "Error al cancelar",
        description: err.response?.data?.message || "Error inesperado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={5}>
      <Heading mb={6}>Mis Reservas</Heading>

      {bookings.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          No tienes reservas aún.
        </Alert>
      ) : (
        <Stack
          spacing={4}
          direction={{ base: "column", md: "row" }}
          flexWrap="wrap"
        >
          {bookings.map((booking) => (
            <Box
              key={booking._id}
              p={4}
              w={{ base: "100%", md: "48%" }}
              borderWidth="1px"
              borderRadius="md"
              shadow="sm"
              bg="gray.50"
            >
              <Stack spacing={1}>
                <Text fontSize="lg" fontWeight="bold">
                  <Icon as={FaPlaneDeparture} mr={2} color="teal.500" />
                  {booking.flight.origin} → {booking.flight.destination}
                </Text>
                <Text>
                  <Icon as={FaChair} mr={2} />
                  Asiento: <strong>{booking.seatNumber}</strong>
                </Text>
                <Text>
                  <Icon as={FaUser} mr={2} />
                  {booking.passengerName} — {booking.passengerEmail}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Reservado el {format(new Date(booking.createdAt), "PPpp")}
                </Text>
              </Stack>

              <Button
                size="sm"
                colorScheme="red"
                mt={3}
                leftIcon={<FaTrashAlt />}
                onClick={() => openCancelDialog(booking)}
              >
                Cancelar reserva
              </Button>
            </Box>
          ))}
        </Stack>
      )}

      {/* Dialogo de confirmación */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancelar reserva
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que deseas cancelar esta reserva?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleCancel} ml={3}>
                Sí, cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MyBookings;
