import { Box, Button, Text, Tooltip, HStack, Icon } from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";

const SeatSelector = ({ seats = [], selectedSeat, onSelect }) => {
  // Contadores
  const totalDisponibles = seats.filter(s => !s.reserved).length;
  const totalReservados = seats.filter(s => s.reserved).length;

  // Agrupar asientos por fila
  const groupedByRow = seats.reduce((acc, seat) => {
    const row = seat.number.slice(0, -1);
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  // Ordenar por fila numérica
  const sortedRows = Object.entries(groupedByRow).sort(([a], [b]) => a - b);

  return (
    <Box>
      {/* Resumen visual con íconos */}
      <HStack
        spacing={6}
        mb={4}
        justify="center"
        align="center"
        px={4}
        py={2}
        borderRadius="md"
        bg="gray.50"
        border="1px"
        borderColor="gray.200"
      >
        <HStack>
          <Icon as={CheckCircleIcon} color="green.400" boxSize={5} />
          <Text fontWeight="medium" color="green.600">
            Disponibles: {totalDisponibles}
          </Text>
        </HStack>

        <HStack>
          <Icon as={NotAllowedIcon} color="gray.500" boxSize={5} />
          <Text fontWeight="medium" color="gray.700">
            Reservados: {totalReservados}
          </Text>
        </HStack>
      </HStack>

      {/* Título */}
      <Text fontWeight="bold" mb={4} textAlign="center">
        Selecciona tu asiento:
      </Text>

      {/* Plano de asientos por filas */}
      {sortedRows.map(([rowNum, seatsInRow]) => {
        const ordered = seatsInRow.sort((a, b) => a.number.localeCompare(b.number));

        const left = ordered.filter(seat => /[A-C]$/.test(seat.number));
        const right = ordered.filter(seat => /[D-F]$/.test(seat.number));

        return (
          <HStack key={rowNum} spacing={10} mb={2} justify="center">
            {/* Lado izquierdo */}
            {left.map(seat => (
              <Tooltip
                key={seat.number}
                label={seat.reserved ? `Reservado por ${seat.passengerName}` : 'Disponible'}
                hasArrow
              >
                <Button
                  onClick={() => !seat.reserved && onSelect(seat.number)}
                  bg={
                    seat.reserved
                      ? 'gray.300'
                      : selectedSeat === seat.number
                      ? 'teal.400'
                      : 'green.200'
                  }
                  isDisabled={seat.reserved}
                  _hover={{ opacity: seat.reserved ? 1 : 0.8 }}
                >
                  {seat.number}
                </Button>
              </Tooltip>
            ))}

            {/* Pasillo */}
            <Box w="40px" />

            {/* Lado derecho */}
            {right.map(seat => (
              <Tooltip
                key={seat.number}
                label={seat.reserved ? `Reservado por ${seat.passengerName}` : 'Disponible'}
                hasArrow
              >
                <Button
                  onClick={() => !seat.reserved && onSelect(seat.number)}
                  bg={
                    seat.reserved
                      ? 'gray.300'
                      : selectedSeat === seat.number
                      ? 'teal.400'
                      : 'green.200'
                  }
                  isDisabled={seat.reserved}
                  _hover={{ opacity: seat.reserved ? 1 : 0.8 }}
                >
                  {seat.number}
                </Button>
              </Tooltip>
            ))}
          </HStack>
        );
      })}
    </Box>
  );
};

export default SeatSelector;
