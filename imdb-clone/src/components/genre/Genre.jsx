import React, { useEffect, useState } from "react";
//componentes de libreria
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

//componentes propios
import axios from "../../axios";
import AddButton from "../utils/AddButton";

const Genre = () => {
  //estados
  const [genreData, setGenreData] = useState([]);
  const [filterGenre, setFilterGenre] = useState("");

  // funciones
  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await axios.get("/genres/");
        setGenreData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGenreData();
  }, []);

  const filteredGenres =
    filterGenre !== ""
      ? genreData.filter((item) =>
          item.name.toLowerCase().includes(filterGenre.toLowerCase())
        )
      : genreData;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setFilterGenre(value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          width: 1,
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Busca tu genero"
          onChange={handleSearchChange}
          sx={{ border: "1px solid white", borderRadius: 2 }}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredGenres.map((actor) => (
          <Grid item xs={12} sm={6} md={4} key={actor.id}>
            <Card
              sx={{
                height: "100px",
                transition: "all 0.3s",
                "&:hover": {
                  cursor: "pointer",
                  bgcolor: "action.hover",
                  border: "1px solid white",
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={sx.typoContinue}>
                  {actor.name}
                </Typography>
                <Typography variant="body2" sx={sx.typoContinue}>
                  {actor.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddButton link={"/agregar-genero"} />
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

export default Genre;
