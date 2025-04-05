import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box bg="teal.500" px={4} color="white">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="xl">
          FlyMe ✈️
        </Text>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Abrir menú"
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={3}
        >
          <Button as={Link} to="/" variant="ghost" color="white" _hover={{ bg: "teal.600" }}>
            Home
          </Button>
          {!user ? (
            <>
              <Button as={Link} to="/login" variant="ghost" color="white">
                Login
              </Button>
              <Button as={Link} to="/register" variant="ghost" color="white">
                Registro
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/mis-reservas"
                variant="ghost"
                color="white"
                bg={
                  location.pathname === "/mis-reservas"
                    ? "teal.700"
                    : "transparent"
                }
                _hover={{ bg: "teal.600" }}
              >
                Mis reservas
              </Button>
              <Text fontSize="sm">Hola, {user.name}</Text>
              <Button onClick={handleLogout} variant="ghost" color="red.200" _hover={{ bg: "teal.600" }}>
                Cerrar sesión
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <Box
          bg="teal.600"
          px={4}
          py={4}
          display={{ md: "none" }}
          borderRadius="md"
          mt={2}
        >
          <Stack spacing={3}>
            <Button
              as={Link}
              to="/"
              variant="ghost"
              color="white"
              w="full"
              justifyContent="flex-start"
              onClick={onClose}
            >
              Home
            </Button>
            {!user ? (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="ghost"
                  color="white"
                  w="full"
                  justifyContent="flex-start"
                  onClick={onClose}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="ghost"
                  color="white"
                  w="full"
                  justifyContent="flex-start"
                  onClick={onClose}
                >
                  Registro
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/mis-reservas"
                  variant="ghost"
                  color="white"
                  w="full"
                  justifyContent="flex-start"
                  onClick={onClose}
                >
                  Mis reservas
                </Button>
                <Text fontSize="sm" color="white" px={2}>
                  Hola, {user.name}
                </Text>
                <Button
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                  variant="ghost"
                  color="red.200"
                  w="full"
                  justifyContent="flex-start"
                >
                  Cerrar sesión
                </Button>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
