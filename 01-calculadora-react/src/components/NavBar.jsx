import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Calculadora
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Registro
        </Button>
        <Button color="inherit" component={Link} to="/user-data">
          Datos Guardados
        </Button>
      </Toolbar>
    </AppBar>
  );
};