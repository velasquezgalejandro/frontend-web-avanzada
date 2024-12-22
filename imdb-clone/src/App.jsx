import React from "react";
// componentes de libreria
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// componentes propios
import theme from "./theme";
import Layout from "./components/layout/Layout";
// vistas generales
import Home from "./components/home/Home";
import Actors from "./components/actors/Actors";
import AddActors from "./components/actors/AddActors";
import Directors from "./components/directors/Directors";
import AddDirectors from "./components/directors/AddDirectors";
import Login from "./components/login/Login";
import Movies from "./components/movies/Movies";
import MoviesDetail from "./components/movies/MoviesDetail";
import AddMovies from "./components/movies/AddMovies";
import Genre from "./components/genre/Genre";
import AddGenre from "./components/genre/AddGenre";

//usuario
import NotFoundPage from "./components/notFound/NotFoundPage";
import Register from "./components/resgister/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Rutas */}
      <Router>
        <Routes>
          {/* Ruta para contenedor */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/actores" element={<Actors />} />
            <Route path="/agregar-actor" element={<AddActors />} />
            <Route path="/directores" element={<Directors />} />
            <Route path="/agregar-director" element={<AddDirectors />} />
            <Route path="/peliculas" element={<Movies />} />
            <Route path="/agregar-pelicula" element={<AddMovies />} />
            <Route path="/movies/:id" element={<MoviesDetail />} />
            <Route path="/generos" element={<Genre />} />
            <Route path="/agregar-genero" element={<AddGenre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
      {/* Rutas  */}
    </ThemeProvider>
  );
}

export default App;
