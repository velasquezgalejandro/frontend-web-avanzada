import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9900", // elementos principales (botones, enlaces)
    },
    secondary: {
      main: "#333333", // Fondo oscuro (áreas secundarias)
    },
    background: {
      default: "#121212", // Fondo cuerpo
      paper: "#1D1D1D", // Fondo contenedores
    },
    text: {
      primary: "#EAEAEA", // Texto principal
      secondary: "#B0B0B0", // Texto secundario
    },
    action: {
      active: "#FF9900", // Iconos y acciones
      hover: "#FF6600", // Hover de acciones
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#EAEAEA",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#EAEAEA",
    },
    body1: {
      fontSize: "1rem",
      color: "#B0B0B0",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#B0B0B0",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Para botones que no quieren mayúsculas automáticas
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#333333", // Barra de navegación con fondo oscuro
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1D1D1D", // Fondo más suave para las tarjetas
          borderRadius: "8px", // Bordes redondeados para las tarjetas
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: "#EAEAEA",
        },
        h2: {
          color: "#EAEAEA",
        },
        body1: {
          color: "#B0B0B0",
        },
      },
    },
  },
});

export default theme;
