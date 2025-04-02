import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box bg="teal.500" color="white" px={6} py={3}>
      <Flex align="center">
        <Text fontWeight="bold" fontSize="lg">
          FlyMe ✈️
        </Text>
        <Spacer />
        <Flex gap={2}>
          <Button as={Link} to="/" colorScheme="teal" variant="ghost">
            Home
          </Button>

          {!user ? (
  <>
    <Button as={Link} to="/login" colorScheme="teal" variant="ghost">
      Login
    </Button>
    <Button as={Link} to="/register" colorScheme="teal" variant="ghost">
      Registro
    </Button>
  </>
) : (
  <>
    <Button as={Link} to="/mis-reservas" colorScheme="teal" variant="ghost">
      Mis reservas
    </Button>
    <Text fontSize="sm" pt={2}>Hola, {user.name}</Text>
    <Button onClick={handleLogout} colorScheme="red" variant="ghost">
      Cerrar sesión
    </Button>
  </>
)}

        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
