import { SimpleGrid, Button } from "@chakra-ui/react";

const SeatSelector = ({ seats = [], selectedSeat, onSelect }) => {
  return (
    <SimpleGrid columns={[3, 4, 6]} spacing={3}>
      {seats.map((seat) => (
        <Button
          key={seat.number}
          isDisabled={seat.reserved}
          onClick={() => onSelect(seat.number)}
          colorScheme={selectedSeat === seat.number ? "teal" : "gray"}
        >
          {seat.number}
        </Button>
      ))}
    </SimpleGrid>
  );
};

export default SeatSelector;
