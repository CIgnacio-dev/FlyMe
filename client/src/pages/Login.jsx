import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user, res.data.token);
      toast({ title: 'Sesión iniciada', status: 'success', duration: 3000 });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.response?.data?.message || 'Verifica tus datos',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading mb={6}>Iniciar sesión</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={form.email} onChange={handleChange} isRequired />
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" name="password" value={form.password} onChange={handleChange} isRequired />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">Entrar</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
