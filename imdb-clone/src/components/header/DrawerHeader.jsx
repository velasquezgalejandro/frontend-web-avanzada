import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

//componentes de librerias
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// media query
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

//componentes propios
import Search from "./Search";

const DrawerHeader = ({ isLoggin, setIsLoggin, userData }) => {
  const navigate = useNavigate();
  // breakoints
  const isLessThanMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  // estados
  const [drawerOpen, setDrawerOpen] = useState(false);
  // funciones
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const renderItem = (label, link) => {
    return (
      <ListItem button onClick={() => navigate(link)}>
        <ListItemText primary={label} />
      </ListItem>
    );
  };

  return (
    <Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon sx={{ color: "primary.main" }} />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)} // Cierra el Drawer al hacer clic fuera
      >
        <List
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
        >
          {renderItem("Inicio", "/")}
          {renderItem("Peliculas", "/peliculas")}
          {renderItem("Actores", "/actores")}
          {renderItem("Directores", "/directores")}
          {renderItem("Generos", "/generos")}
          {isLoggin ? (
            <Box>
              <ListItem button>
                <ListItemText primary={"Bienvenido"} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={userData.first_name} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={userData.last_name} />
              </ListItem>
            </Box>
          ) : (
            renderItem("Iniciar sesión", "/Login")
          )}

          {isLoggin ? (
            <Box>
              <ListItem
                button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  setIsLoggin(false);
                  navigate("/login");
                }}
              >
                <ListItemText primary={"Cerrar sesión"} />
              </ListItem>
            </Box>
          ) : (
            <Box />
          )}
        </List>
        {isLessThanMd ? (
          <Box sx={{ px: 2 }}>
            <Search />
          </Box>
        ) : (
          <Box></Box>
        )}
      </Drawer>
    </Fragment>
  );
};

export default DrawerHeader;
