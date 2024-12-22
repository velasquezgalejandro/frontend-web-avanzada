import { useState } from "react";
import { useNavigate } from "react-router-dom";
// componentes de libreria
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//componentes propios
import axios from "../../axios";

const AddGenre = () => {
  const navigate = useNavigate();
  // estados
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // funciones
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await axios.post("/genres/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Genero añadido con éxito");
      setError("");
      setFormData({
        name: "",
        description: "",
      });
      navigate("/generos");
    } catch (err) {
      setError("Error al añadir genero: " + err.response.data.error);
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
          Registro de Genero
        </Typography>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <TextField
          label="descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
      </Box>
    </Box>
  );
};

export default AddGenre;
