import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//componentes de libreria
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

//componentes propios
import axios from "../../axios";
import AddButton from "../utils/AddButton";

const Movies = () => {
  const navigate = useNavigate();
  //estados
  const [moviesData, setMoviesData] = useState([]);
  const [GenreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  // funciones
  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const responseGenre = await axios.get("/genres/");
        setGenreData(responseGenre.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchMovieData = async () => {
      try {
        const responseMovies = await axios.get("/movies/");
        setMoviesData(responseMovies.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGenreData();
    fetchMovieData();
  }, []);

  // Obtener las películas filtradas por género
  const filteredMovies = selectedGenre
    ? moviesData.filter((movie) =>
        movie.genres.some((genre) => genre.id === selectedGenre)
      )
    : moviesData;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          width: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          displayEmpty
          sx={{ marginBottom: 2, border: "1px solid white" }}
        >
          <MenuItem value="">Todos los Géneros</MenuItem>
          {GenreData.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card
              onClick={() => navigate(`/movies/${movie.id}`)}
              sx={{
                height: "450px",
                transition: "all 0.3s",
                "&:hover": {
                  cursor: "pointer",
                  bgcolor: "action.hover",
                  border: "1px solid white",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "secondary.main",
                }}
              >
                <Box
                  component="img"
                  src={movie.poster}
                  alt={movie.title}
                  sx={{ height: "300px" }}
                />
              </Box>
              <CardContent>
                <Typography variant="h5" sx={sx.typoContinue}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" sx={sx.typoContinue}>
                  {movie.description}
                </Typography>
                <Typography variant="caption" sx={sx.typoContinue}>
                  Géneros: {movie.genres.map((g) => g.name).join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddButton link={"/agregar-pelicula"} />
    </Box>
  );
};

const sx = {
  typoContinue: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // Limitar a 2 líneas
    overflow: "hidden", // Ocultar el texto excedente
    textOverflow: "ellipsis", // Mostrar puntos suspensivos
  },
};

export default Movies;
