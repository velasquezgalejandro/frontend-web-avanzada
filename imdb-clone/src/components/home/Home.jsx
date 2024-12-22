import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// componentes de libreria
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// componentes propios
import axios from "../../axios";

//componente
const Home = () => {
  const navigate = useNavigate();
  const [moviesData, setMoviesData] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [recomendMovies, setRecomendMovies] = useState([]);

  //effectos
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("movies/"); // Ruta relativa basada en baseURL
        // recomendadas
        const shuffledMovies = response.data.sort(() => 0.5 - Math.random());
        const random = shuffledMovies.slice(0, 5);
        // mas recientes
        const sortedMovies = response.data.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        const recentMovies = sortedMovies.slice(0, 4);
        setRandomMovies(random);
        setRecomendMovies(recentMovies);
        setMoviesData(response.data);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };

    fetchMovies();
  }, []);

  const renderRecomendCard = (title, description, image, id) => {
    return (
      <Box
        key={title}
        item
        onClick={() => navigate(`/movies/${id}`)}
        sx={{
          border: "1px solid",
          borderRadius: 2,
          borderColor: "primary.main",
          height: "110px",
          width: "100%",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            cursor: "pointer",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            component={"img"}
            src={image}
            alt="title"
            sx={{
              height: "auto",
              maxHeight: "108px", // Corregir harcodeo
              borderRadius: "8px 0px 0px 8px",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              height: 1,
              display: "flex",
              flexDirection: "column",
              pl: 3,
              overflow: "hidden",
              textAlign: "left",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                pb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // Limitar a 2 líneas
                overflow: "hidden", // Ocultar el texto excedente
                textOverflow: "ellipsis", // Mostrar puntos suspensivos
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={sx.container}>
      <Grid container>
        <Grid item xs={12} md={6} sx={sx.gridContainer}>
          <Box>
            <h2>Películas Recomendadas</h2>

            {randomMovies.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                navigation
                pagination={{ clickable: true }}
              >
                {randomMovies.map((pelicula) => (
                  <SwiperSlide key={pelicula.id}>
                    <Box
                      onClick={() => navigate(`/movies/${pelicula.id}`)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={pelicula.poster}
                        alt={pelicula.title}
                        style={{
                          width: "auto",
                          height: 500,
                          aspectRatio: "3/4",
                          borderRadius: "8px",
                        }}
                      />
                      <p>{pelicula.title}</p>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Box />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: { xs: 0, md: 2 } }}>
          <Box>
            <h2>Películas Recomendadas</h2>
            <Box
              sx={{
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "space-between",
              }}
            >
              {recomendMovies.map((pelicula) =>
                renderRecomendCard(
                  pelicula.title,
                  pelicula.description,
                  pelicula.poster,
                  pelicula.id
                )
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const sx = {
  container: {
    p: 2,
  },
  gridContainer: {
    py: 1,
  },
};

export default Home;
