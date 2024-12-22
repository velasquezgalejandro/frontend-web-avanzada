import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
// componentes de libreria
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
//componentes propios
import axios from "../../axios";
import CommentsSeccion from "./CommentsSeccion";

const MoviesDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la película desde la URL
  const [movieData, setMovieData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [filteredRatingData, setFilteredRatingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/movies/${id}/`); // Asegúrate de que esta sea la ruta correcta de tu API
        const responseRating = await axios.get(`/rating/`); // Asegúrate de que esta sea la ruta correcta de tu API
        setMovieData(response.data);
        setRatingData(responseRating.data);
        setLoading(false);
      } catch (err) {
        setError("No se pudo cargar la información de la película.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movieData) {
      const filteredRatings = ratingData.filter(
        (rating) => rating.movie === movieData.id
      );
      setFilteredRatingData(filteredRatings);
    }
  }, [ratingData, movieData]);

  const promedio = filteredRatingData.length
    ? filteredRatingData.reduce((sum, rating) => sum + rating.score, 0) /
      filteredRatingData.length
    : 0;

  if (loading)
    return <Typography>Cargando detalles de la película...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Fragment>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        <Card>
          {movieData.poster && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "secondary.main",
              }}
            >
              <Box
                component="img"
                src={movieData.poster}
                alt={movieData.title}
                sx={{ height: "400px" }}
              />
            </Box>
          )}
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {movieData.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {movieData.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Géneros: {movieData.genres.map((genre) => genre.name).join(", ")}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Director: {movieData.director.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Actores: {movieData.actors.map((actor) => actor.name).join(", ")}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Fecha de lanzamiento: {movieData.release_date}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Calificación promedio:{" "}
              {promedio
                ? `${promedio.toFixed(2)} / 10`
                : "Sin calificaciones aún"}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <CommentsSeccion />
    </Fragment>
  );
};

export default MoviesDetail;
