import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// componentes de libreria
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

//componentes propios
import axios from "../../axios";

const Register = () => {
  const navigate = useNavigate();
  // estados
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //funciones
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register/", formData);
      alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      setError("");
      navigate("/login");
    } catch (err) {
      setError("Error al registrar usuario: " + err.response.data.error);
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
          Registro de Usuario
        </Typography>
        <TextField
          label="Nombre"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <TextField
          label="Nombre de Usuario"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <TextField
          label="Nombre de Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
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
        {success && <Typography color="success.main">{success}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
