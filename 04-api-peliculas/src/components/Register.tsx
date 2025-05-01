import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  ThemeProvider, 
  Typography, 
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Fingerprint,
  Lock
} from '@mui/icons-material';
import loginImage from '../assets/login.svg';
import { darkTheme } from '../styles/styles'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

const Register = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    documento: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    passwordMatch: false,
    emailInvalid: false,
    documentoInvalid: false
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validaciones en tiempo real
    if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        passwordMatch: value !== formData.password
      }));
    }
    
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors(prev => ({
        ...prev,
        emailInvalid: !emailRegex.test(value)
      }));
    }

    if (name === 'documento') {
      const docRegex = /^[0-9]{8,15}$/;
      setErrors(prev => ({
        ...prev,
        documentoInvalid: !docRegex.test(value)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación final antes de enviar
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!formData.nombres || !formData.apellidos || !formData.documento || 
        !formData.email || !formData.password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Check if the user already exists
    const users: { email: string; documentId: string }[] = JSON.parse(localStorage.getItem('users') || "[]");
    const userExists = users.some((user) => 
      user.email === formData.email || user.documentId === formData.documento
    );

    if (userExists) {
      alert('El correo o documento ya están registrados');
      return;
    }

    // Crear nuevo usuario
    const token = `fake-token-${Math.random().toString(36).substr(2, 9)}`;
    const newUser = { 
      ...formData,
      token,
      // No guardamos la confirmación de contraseña por seguridad
      confirmPassword: undefined 
    };
    
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    navigate('/login');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        bgcolor: '#121212',
        p: 2
      }}>
        <Paper elevation={10} sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 400,
          borderRadius: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 3 
          }}>
            <img 
              src={loginImage} 
              alt="Register" 
              style={{ 
                width: '150px',
                filter: 'brightness(0.8)'
              }} 
            />
          </Box>
          
          <Typography 
            variant="h5" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Crear cuenta
          </Typography>
          
          <form onSubmit={handleSubmit}>
            {/* Nombres */}
            <TextField
              label="Nombres"
              name="nombres"
              type="text"
              fullWidth
              margin="normal"
              autoComplete="given-name"
              value={formData.nombres}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {/* Apellidos */}
            <TextField
              label="Apellidos"
              name="apellidos"
              type="text"
              fullWidth
              margin="normal"
              autoComplete="family-name"
              value={formData.apellidos}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {/* Documento de Identidad */}
            <TextField
              label="Documento de Identidad"
              name="documento"
              type="text"
              fullWidth
              margin="normal"
              autoComplete="off"
              value={formData.documento}
              onChange={handleChange}
              required
              error={errors.documentoInvalid}
              helperText={errors.documentoInvalid ? "Documento inválido (8-15 dígitos)" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Fingerprint color="primary" />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {/* Email */}
            <TextField
              label="Correo Electrónico"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.emailInvalid}
              helperText={errors.emailInvalid ? "Correo electrónico inválido" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {/* Contraseña */}
            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {/* Confirmar Contraseña */}
            <TextField
              label="Confirmar Contraseña"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={errors.passwordMatch}
              helperText={errors.passwordMatch ? "Las contraseñas no coinciden" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />
            
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              size="large"
              sx={{ 
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              Registrarse
            </Button>
          </form>
          
          <Typography 
            sx={{ 
              mt: 3, 
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            ¿Ya tienes cuenta?{' '}
            <Link 
              component="button" 
              onClick={() => navigate('/login')}
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Inicia sesión
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};


export default Register;