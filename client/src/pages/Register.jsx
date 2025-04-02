import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Registro
      await axios.post('http://localhost:5000/api/auth/register', form);

      // 2. Insta Login
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email,
        password: form.password,
      });

      login(res.data.user, res.data.token);
      toast({ title: 'Cuenta creada y sesión iniciada', status: 'success', duration: 3000 });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({ title: 'Error al registrarse', description: error.response?.data?.message || 'Algo salió mal', status: 'error', duration: 3000 });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading mb={6}>Crear cuenta</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} isRequired />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={form.email} onChange={handleChange} isRequired />
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" name="password" value={form.password} onChange={handleChange} isRequired />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">Registrarse</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
