import React from "react";
import { useNavigate } from "react-router-dom";
//componentes  de libreria
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const Footer = () => {
  const navigate = useNavigate();

  const renderLocalLinks = (label, link) => {
    return (
      <Typography
        onClick={() => navigate(link)}
        href={link}
        color="inherit"
        sx={sx.localLinks}
      >
        {label}
      </Typography>
    );
  };

  const renderLinks = (label, link) => {
    return (
      <Link
        target={"_blank"}
        href={link}
        color="inherit"
        underline="hover"
        sx={sx.links}
      >
        {label}
      </Link>
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Section 1: About */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sobre Nosotros
            </Typography>
            <Typography variant="body2">
              Pelirank es tu plataforma definitiva para descubrir, calificar y
              reseñar películas y series.
            </Typography>

            <Typography variant="body2">
              This is a fan-made project inspired by IMDb.
            </Typography>
          </Grid>

          {/* Section 2: Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Links Rapidos
            </Typography>
            <Box>
              {renderLocalLinks("Inicio", "/")}
              {renderLocalLinks("Peliculas", "/peliculas")}
              {renderLocalLinks("Actores", "/actores")}
              {renderLocalLinks("Directores", "/directores")}
              {renderLocalLinks("Generos", "/generos")}
            </Box>
          </Grid>

          {/* Section 3: Social Media */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Siguenos
            </Typography>
            <Box>
              {renderLinks(
                "Facebook",
                "https://www.facebook.com/?locale=es_LA"
              )}
              {renderLinks("Twitter", "https://x.com/")}
              {renderLinks("Instagram", "https://www.instagram.com/")}
              {renderLinks("Tik Tok", "https://www.tiktok.com/")}
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            pt: 2,
            borderTop: "1px solid #444",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} PeliRank. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const sx = {
  localLinks: {
    display: "block",
    mb: 1,
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  links: {
    display: "block",
    mb: 1,
  },
};

export default Footer;
