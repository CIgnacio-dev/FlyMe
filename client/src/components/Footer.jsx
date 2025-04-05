import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="teal.600" color="white" mt="auto" py={4} px={6}>
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Text fontSize="sm">© 2025 FlyMe. Todos los derechos reservados.</Text>
        
        <Flex gap={3}>
          <IconButton
            as="a"
            href="https://github.com/CIgnacio-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            icon={<FaGithub />}
            variant="ghost"
            color="white"
            _hover={{ color: "gray.300" }}
          />
          <IconButton
            as="a"
            href="https://linkedin.com/in/tu-perfil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
            color="white"
            _hover={{ color: "gray.300" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
