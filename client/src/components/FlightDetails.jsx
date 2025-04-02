import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Spinner, VStack, Input, Button, Heading, Text, useToast } from '@chakra-ui/react';
import SeatSelector from '../components/SeatSelector';
import { getFlights, bookFlight } from '../services/api';

const FlightDetails = () => {
  const { id } = useParams();
  const toast = useToast();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await getFlights(); // traer todos los vuelos
        const selected = res.data.find(f => f._id === id);
        setFlight(selected);
      } catch (err) {
        console.error('Error al cargar vuelo', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  const handleReserve = async () => {
    try {
      await bookFlight(flight._id, {
        seatNumber: selectedSeat,
        passengerName: name,
        passengerEmail: email,
      });

      toast({
        title: 'Reserva confirmada',
        description: `Tu asiento ${selectedSeat} ha sido reservado`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al reservar';
      toast({
        title: 'No se pudo reservar',
        description: msg,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" />;

  if (!flight) return <Text>Vuelo no encontrado</Text>;

  return (
    <Box p={5}>
      <Heading mb={4}>Reservar vuelo {flight.origin} → {flight.destination}</Heading>

      <VStack spacing={4} align="stretch">
        <SeatSelector
          seats={flight.seats}
          selectedSeat={selectedSeat}
          onSelect={setSelectedSeat}
        />

        <Input
          placeholder="Nombre del pasajero"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
        />

        <Button
          colorScheme="teal"
          onClick={handleReserve}
          isDisabled={!selectedSeat || !name || !email}
        >
          Confirmar reserva
        </Button>
      </VStack>
    </Box>
  );
};

export default FlightDetails;
