import React, { useState} from "react";
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
  Avatar,
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
import loginImage from "../assets/login.svg"; // Ajusta la ruta si es necesario


const NavBar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  

  return (
    
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
        </Box>
 );
 
};


export default NavBar;
