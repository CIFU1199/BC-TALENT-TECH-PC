import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const UserData = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    documento: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  // Función para guardar cambios
  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setEditMode(false);
    alert('Datos actualizados correctamente!');
  };

  // Función para eliminar datos
  const handleDelete = () => {
    localStorage.removeItem('userData');
    setUserData({ nombre: '', apellido: '', documento: '' });
    setOpenDialog(false);
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Datos Registrados
      </Typography>
      
      {editMode ? (
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Apellido"
            name="apellido"
            value={userData.apellido}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Documento"
            name="documento"
            value={userData.documento}
            onChange={handleChange}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSave}
            >
              Guardar
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Typography><strong>Nombre:</strong> {userData.nombre}</Typography>
          <Typography><strong>Apellido:</strong> {userData.apellido}</Typography>
          <Typography><strong>Documento:</strong> {userData.documento}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setEditMode(true)}
            >
              Editar
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              startIcon={<DeleteIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Eliminar
            </Button>
          </Stack>
        </Box>
      )}

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Eliminar todos los datos?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};