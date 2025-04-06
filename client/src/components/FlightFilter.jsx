import { Box, Select, Button, HStack, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getLocations } from "../services/api";

const FlightFilter = ({ flights, onFilter }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await getLocations();
        setOrigins(res.data.origins);
        setDestinations(res.data.destinations);
      } catch (err) {
        console.error("Error al obtener ubicaciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    const filtered = flights.filter(
      (f) =>
        (!origin || f.origin === origin) &&
        (!destination || f.destination === destination)
    );
    onFilter(filtered);
  };

  const handleReset = () => {
    setOrigin("");
    setDestination("");
    onFilter(flights); 
  };

  if (loading) return <Spinner />;

  return (
    <Box mb={6}>
      <HStack spacing={4} flexWrap="wrap">
        <Select
          placeholder="Origen"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        >
          {origins
            .filter((ciudad) => ciudad !== destination)
            .map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
        </Select>

        <Select
          placeholder="Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          {destinations
            .filter((ciudad) => ciudad !== origin)
            .map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
        </Select>

        <Button onClick={handleSearch} colorScheme="brand">
          Buscar
        </Button>
        <Button onClick={handleReset} variant="outline">
          Limpiar
        </Button>
      </HStack>
    </Box>
  );
};

export default FlightFilter;
