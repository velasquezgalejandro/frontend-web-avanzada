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

const Directors = () => {
  //estados
  const [directorsData, setDirectorsData] = useState([]);
  const [filterDirector, setFilterDirector] = useState("");

  // funciones
  useEffect(() => {
    const fetchActorsData = async () => {
      try {
        const response = await axios.get("/directors/");
        setDirectorsData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchActorsData();
  }, []);

  const filteredDirectors =
    filterDirector !== ""
      ? directorsData.filter((item) =>
          item.name.toLowerCase().includes(filterDirector.toLowerCase())
        )
      : directorsData;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setFilterDirector(value);
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
          label="Busca tu actor"
          onChange={handleSearchChange}
          sx={{ border: "1px solid white", borderRadius: 2 }}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredDirectors.map((actor) => (
          <Grid item xs={12} sm={6} md={4} key={actor.id}>
            <Card
              sx={{
                height: "150px",
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
                  {actor.birth_date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddButton link={"/agregar-director"} />
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

export default Directors;
