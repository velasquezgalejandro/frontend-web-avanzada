import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//componentes de librerias
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// media query
import useMediaQuery from "@mui/material/useMediaQuery";

// componentes propios
import Search from "./Search";
import DrawerHeader from "./DrawerHeader";
import axios from "../../axios";

// componente
const Header = () => {
  const navigate = useNavigate();
  const isLessThanMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [isLoggin, setIsLoggin] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      try {
        const response = await axios.get("/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoggin(true);
        setUserData(response.data);
      } catch (err) {
        setIsLoggin(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <Box sx={sx.flexGrow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            noWrap
            component="div"
            sx={sx.typo}
          >
            PeliRank
          </Typography>
          <Box sx={sx.flexGrow} />
          {!isLessThanMd ? <Search /> : <Box />}
          <Box sx={sx.flexGrow} />
          <DrawerHeader
            isLoggin={isLoggin}
            setIsLoggin={setIsLoggin}
            userData={userData}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const sx = {
  flexGrow: {
    flexGrow: 1,
  },
  typo: {
    color: "primary.main",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
    },
  },
};

export default Header;
