import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
    alert('Datos guardados correctamente!');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Formulario de Registro
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Documento"
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          fullWidth
        >
          Guardar
        </Button>
      </Box>
    </Paper>
  );
};