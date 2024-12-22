import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// componentes de librerias
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// componentes propios
import axios from "../../axios";

const Login = () => {
  const navigate = useNavigate();
  // estados
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Funciones
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/token/", formData);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      setError("Credenciales inválidas. Verifica tu email y contraseña.");
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
          Iniciar Sesión
        </Typography>
        <TextField
          label="username"
          name="username"
          type="text"
          value={formData.user}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Ingresar
        </Button>
        <Button
          onClick={() => navigate("/register/")}
          variant="contained"
          color="secondary"
        >
          Registrarse
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
