import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// componentes de libreria
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//componentes propios
import axios from "../../axios";

const AddActors = () => {
  const navigate = useNavigate();
  // estados
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
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
      await axios.post("/actors/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Actor añadido con éxito");
      setError("");
      setFormData({
        name: "",
        birth_date: "",
      });
      navigate("/actores");
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
          Registro de Actor
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
          helperText="Fecha de nacimiento"
          name="birth_date"
          type="date"
          value={formData.birth_date}
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

export default AddActors;
