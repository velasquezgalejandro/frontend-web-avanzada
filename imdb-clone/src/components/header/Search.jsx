import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

//componentes de librerias
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Search = () => {
  const navigate = useNavigate();
  //estados
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  //funciones
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("movies/"); // Ruta relativa basada en baseURL
        setMovies(response.data);
        setFilteredMovies(response.data); // Mostrar todas las películas inicialmente
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    const filtered = movies.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleOptionSelect = (event, value) => {
    const selectedMovie = movies.find((movie) => movie.title === value);
    if (selectedMovie) {
      navigate(`/movies/${selectedMovie.id}`);
    }
  };

  // Inicializar los ítems filtrados
  useEffect(() => {
    setFilteredMovies(movies);
  }, []);

  return (
    <Box sx={sx.container}>
      <Autocomplete
        size="small"
        disablePortal
        options={filteredMovies.map((movie) => movie.title)}
        sx={sx.select}
        onChange={handleOptionSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Busca tu pelicula"
            onChange={handleSearchChange}
          />
        )}
      />
    </Box>
  );
};

const sx = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  select: {
    width: "100%",
  },
};

export default Search;
