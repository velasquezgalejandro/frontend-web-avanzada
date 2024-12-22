import React from "react";
import { Outlet } from "react-router-dom";
// componentes de librerias
import Box from "@mui/material/Box";
// componentes propios
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <Box>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
};

export default Layout;
