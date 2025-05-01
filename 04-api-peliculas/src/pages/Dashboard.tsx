import React, { useState, useEffect } from "react";
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
  ListItemButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CssBaseline,
  ThemeProvider,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Pagination,
  Grid
} from "@mui/material";
//import Grid from "@mui/material/Grid";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Movie as MovieIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { darkTheme } from "../styles/styles"; // Asegúrate de que la ruta sea correcta
import loginImage from "../assets/login.svg"; // Ajusta la ruta si es necesario


const Dashboard = () => {
  type Movie = {
    id: number;
    title: string;
    image: string;
    year: string;
    rating: string;
    overview: string;
  };

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<null | Movie>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Cargar las películas en base a la página actual
  useEffect(() => {
    const fetchMovies = async (page: number) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=es-ES&page=${page}`
        );
        type ApiMovie = {
          id: number;
          title: string;
          poster_path: string;
          release_date: string;
          vote_average: number;
          overview: string;
        };

        const results = response.data.results.map((movie: ApiMovie) => ({
          id: movie.id,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
          rating: movie.vote_average.toFixed(1),
          overview: movie.overview,
        }));
        setMovies(results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error al cargar películas:", error);
      }
    };

    fetchMovies(currentPage); // Solo se llama cuando la página cambia
  }, [currentPage]);

  // Cargar los favoritos almacenados al inicio
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMovie(null);
  };

  const handleAddToFavorites = (movie: Movie) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setSnackbarMessage(`${movie.title} agregada a Favoritos`);
    } else {
      setSnackbarMessage(`${movie.title} ya está en Favoritos`);
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#1e1e1e",
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
              <img
                src={loginImage}
                alt="Login"
                style={{
                  width: "150px", // Ajusta el tamaño según necesites
                  height: "auto",
                }}
              />
            </Typography>

            {/* Perfil del usuario */}
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Avatar
                alt="Usuario"
                src="https://i.pravatar.cc/300"
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Typography variant="body1">Edward Cifuentes</Typography>
            </Box>

            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
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
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#121212",
              borderRight: "1px solid rgba(255, 255, 255, 0.12)",
            },
          }}
        >
          <Toolbar /> {/* Espacio para el AppBar */}
          <List>
            {[
              { text: "Inicio", icon: <HomeIcon /> },
              { text: "Películas", icon: <MovieIcon /> },
              { text: "Favoritos", icon: <FavoriteIcon /> },
              { text: "Búsqueda", icon: <SearchIcon /> },
            ].map((item) => (
              <ListItem
                key={item.text}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(144, 202, 249, 0.08)",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{ color: "primary.main", minWidth: "40px" }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ variant: "body1" }}
                  />
                </ListItemButton>
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
            mt: "64px", // Altura del AppBar
            backgroundColor: "#121212",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {/* Estadísticas rápidas */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {/* Buscador */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar películas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                }}
                sx={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: 1,
                  input: { color: "white" },
                  "& fieldset": { borderColor: "rgba(255,255,255,0.23)" },
                }}
              />
            </Box>
            {/*Campos de favoritos*/}
            <Grid container>
              <Grid spacing={{xs:12, sm:4}}>
                <Card sx={{ p: 2, backgroundColor: "#1e1e1e", color: "white" }}>
                  <Typography variant="h6">Total Películas</Typography>
                  <Typography variant="h4" color="primary">
                    {movies.length}
                  </Typography>
                </Card>
              </Grid>
              <Grid spacing={{xs:12, sm:4}}>
                <Card sx={{ p: 2, backgroundColor: "#1e1e1e", color: "white" }}>
                  <Typography variant="h6">Favoritos</Typography>
                  <Typography variant="h4" color="secondary">
                    {favorites.length}
                  </Typography>
                </Card>
              </Grid>
              <Grid spacing={{xs:12, sm:4}}>
                <Card sx={{ p: 2, backgroundColor: "#1e1e1e", color: "white" }}>
                  <Typography variant="h6">Recomendadas</Typography>
                  <Typography variant="h4" sx={{ color: "success.main" }}>
                    3
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, color: "white" }}>
            Recomendaciones para ti
          </Typography>

          {/* Grid de películas */}
          <Grid container spacing={4} display={"flex"} justifyContent={"center"}>
            {filteredMovies.map((movie) => (
              <Grid key={movie.id} spacing={{xs:12, sm:6, md:4, lg:3}} >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={movie.image}
                    alt={movie.title}
                    sx={{
                      aspectRatio: "2/3", // Relación de aspecto para posters
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      sx={{ color: "white" }}
                    >
                      {movie.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {movie.year} • ⭐ {movie.rating}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                      size="small"
                      color="primary"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleOpenDialog(movie)}
                    >
                      Ver detalles
                    </Button>
                    <Button
                      size="small"
                      color={
                        favorites.some((fav) => fav.id === movie.id)
                          ? "success"
                          : "secondary"
                      }
                      sx={{ textTransform: "none" }}
                      onClick={() => handleAddToFavorites(movie)}
                    >
                      Favoritos
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_event, value) => setCurrentPage(value)}
              color="primary"
              showFirstButton
              showLastButton
              size="small"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </Box>
      </Box>

      {/* Detalles de película en dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedMovie && (
          <>
            <DialogTitle sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
              {selectedMovie.title}
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
              <Box
                component="img"
                src={selectedMovie.image}
                alt={selectedMovie.title}
                sx={{ width: "100%", borderRadius: 2, mb: 2 }}
              />
              <Typography variant="body1">
                <strong>Año:</strong> {selectedMovie.year}
              </Typography>
              <Typography variant="body1">
                <strong>Rating:</strong> ⭐ {selectedMovie.rating}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Resumen:</strong> {selectedMovie.overview}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#1e1e1e" }}>
              <Button
                onClick={handleCloseDialog}
                sx={{ textTransform: "none", color: "white" }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
};

export default Dashboard;
