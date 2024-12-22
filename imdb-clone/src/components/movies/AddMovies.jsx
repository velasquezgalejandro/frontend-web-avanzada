import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// componentes de libreria
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";

//componentes propios
import axios from "../../axios";

const AddMovies = () => {
  const navigate = useNavigate();
  // estados
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    release_date: "",
    poster: "",
    actors: [],
    director: {},
    genres: [],
  });
  console.log(formData);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [directorsData, setDirectorsData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [actorsData, setActorsData] = useState([]);

  //funciones
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, poster: e.target.files[0] });
  };

  const handleActorsChange = (e) => {
    const selectedActors = e.target.value.map((actorId) =>
      actorsData.find((actor) => actor.id === actorId)
    );
    setFormData({ ...formData, actors: selectedActors });
  };

  const handleGenresChange = (e) => {
    const selectedGenres = e.target.value.map((genreId) =>
      genresData.find((genre) => genre.id === genreId)
    );
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleDirectorChange = (e) => {
    const selectedDirector = directorsData.find(
      (director) => director.id === parseInt(e.target.value)
    );
    setFormData({ ...formData, director: selectedDirector }); // Almacenar el objeto completo
  };

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const responseGenre = await axios.get("/genres/");
        setGenresData(responseGenre.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchDirectorData = async () => {
      try {
        const responseDirectors = await axios.get("/directors/");
        setDirectorsData(responseDirectors.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchActorsData = async () => {
      try {
        const responseActors = await axios.get("/actors/");
        setActorsData(responseActors.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGenreData();
    fetchDirectorData();
    fetchActorsData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("release_date", formData.release_date);
    data.append("poster", formData.poster); // Aquí se añade el archivo

    // Añadir actores, director y géneros
    formData.actors.forEach((actor) => data.append("actors", actor.id));
    if (formData.director?.id) {
      data.append("director", formData.director.id);
    }
    formData.genres.forEach((genre) => data.append("genres", genre.id));

    try {
      await axios.post("/movies/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Película añadida con éxito");
      setError("");
      setFormData({
        title: "",
        description: "",
        release_date: "",
        poster: "",
        actors: "",
        director: "",
        genres: "",
      });
      navigate("/peliculas");
    } catch (err) {
      setError("Error al añadir película: " + err.response.data.error);
      setSuccess("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "600px",
        p: 2,
      }}
    >
      <Box
        sx={{
          minWidth: "500px",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: "8px 6px 8px -5px rgba(240,216,240,1)",
          border: "1px solid",
          borderColor: "white",
          p: 4,
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Registro de Pelicula
        </Typography>
        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          multiline
          rows={4}
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <TextField
          helperText="Fecha de Estreno"
          name="release_date"
          type="date"
          value={formData.release_date}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <Box
          component="input"
          type="file"
          name="poster"
          accept="image/*"
          onChange={handleFileChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
            minHeight: "56px",
          }}
        />

        <FormControl required sx={{ minWidth: 120 }}>
          <InputLabel id="actors-label">Actores</InputLabel>
          <Select
            labelId="actors-label"
            name="actors"
            multiple
            value={formData.actors.map((actor) => actor.id)}
            onChange={handleActorsChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={actorsData.find((a) => a.id === value)?.name}
                  />
                ))}
              </Box>
            )}
            sx={{
              border: "1px solid white",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            {actorsData.map((actor) => (
              <MenuItem key={actor.id} value={actor.id}>
                {actor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required sx={{ minWidth: 120 }}>
          <InputLabel id="director-label">Director</InputLabel>
          <Select
            labelId="director-label"
            name="director"
            value={formData.director.name}
            onChange={handleDirectorChange}
            label="Director"
            sx={{
              border: "1px solid white",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            {directorsData.map((director) => (
              <MenuItem key={director.id} value={director.id}>
                {director.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required sx={{ minWidth: 120 }}>
          <InputLabel id="genres-label">Generos</InputLabel>
          <Select
            labelId="genres-label"
            name="genres"
            multiple
            value={formData.genres.map((genre) => genre.id)}
            onChange={handleGenresChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={genresData.find((a) => a.id === value)?.name}
                  />
                ))}
              </Box>
            )}
            sx={{
              border: "1px solid white",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            {genresData.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
      </Box>
    </Box>
  );
};

export default AddMovies;
