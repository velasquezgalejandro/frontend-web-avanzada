import React from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ link }) => {
  const navigate = useNavigate();
  return (
    <Fab
      onClick={() => {
        navigate(link);
      }}
      size="small"
      color="secondary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        bgcolor: "primary.main",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
