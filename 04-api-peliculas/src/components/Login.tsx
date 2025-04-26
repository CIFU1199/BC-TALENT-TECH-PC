import React, { useState } from 'react';
import { Box, TextField, Button, Paper, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate desde react-router-dom
// Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import loginImage from '../assets/login.svg'; // Ajusta la ruta si es necesario

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Asegúrate de importar useNavigate desde react-router-dom

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('Email:', email, 'Password:', password);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: { email: string; password: string }) => user.email === email && user.password === password);

    

    if (user) {
    localStorage.setItem('authToken', user.token); // Guardamos el token
    navigate('/dashboard');
  } else {
    alert('Email o contraseña incorrectos');
  }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#121212',
        }}
      >
        <Paper elevation={10} sx={{ padding: 4, width: 300 }}>
          {/* Imagen en lugar del Typography */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: 3 
            }}
          >
            <img 
              src={loginImage} 
              alt="Login" 
              style={{ 
                width: '150px', // Ajusta el tamaño según necesites
                height: 'auto', 
              }} 
            />
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Ingresar
            </Button>

            {/* Botón de Registrar */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/register')}
          >
            Registrar
          </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

// Tema oscuro (igual que antes)
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3797e5',
    },
    background: {
      default: '#121212',
      paper: '#151f3c',
    },
  },
});

export default Login;