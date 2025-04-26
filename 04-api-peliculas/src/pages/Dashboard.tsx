import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Movie as MovieIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo
const mockMovies = [
  {
    id: 1,
    title: 'Dune',
    image: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    year: '2021',
    rating: '8.4',
  },
  {
    id: 2,
    title: 'The Batman',
    image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    year: '2022',
    rating: '8.1',
  },
  // Puedes agregar más películas aquí...
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* AppBar */}
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#1e1e1e'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              TMDB
            </Typography>
            <Button 
              color="inherit" 
              startIcon={<LogoutIcon />} 
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Cerrar sesión
            </Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en móviles
          }}
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: '#121212',
              borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            },
          }}
        >
          <Toolbar /> {/* Espacio para el AppBar */}
          <List>
            {[
              { text: 'Inicio', icon: <HomeIcon /> },
              { text: 'Películas', icon: <MovieIcon /> },
              { text: 'Favoritos', icon: <FavoriteIcon /> },
              { text: 'Búsqueda', icon: <SearchIcon /> },
            ].map((item) => (
              <ListItem 
                button 
                key={item.text}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(144, 202, 249, 0.08)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: '40px' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Contenido principal */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            mt: '64px', // Altura del AppBar
            backgroundColor: '#121212',
            minHeight: 'calc(100vh - 64px)'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'white' }}>
            Recomendaciones para ti
          </Typography>

          {/* Grid de películas */}
          <Grid container spacing={4}>
            {mockMovies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    backgroundColor: '#1e1e1e',
                    color: 'white',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={movie.image}
                    alt={movie.title}
                    sx={{ 
                      aspectRatio: '2/3', // Relación de aspecto para posters
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" sx={{ color: 'white' }}>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {movie.year} • ⭐ {movie.rating}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button 
                      size="small" 
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      Ver detalles
                    </Button>
                    <Button 
                      size="small" 
                      color="secondary"
                      sx={{ textTransform: 'none' }}
                    >
                      Favoritos
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

// Tema oscuro mejorado
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      contrastText: '#000',
    },
    secondary: {
      main: '#f48fb1',
      contrastText: '#000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Botones con texto normal
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default Dashboard;