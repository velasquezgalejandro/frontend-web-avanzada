import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//componentes de libreria
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//componentes propios
import axios from "../../axios";

const CommentsSeccion = () => {
  const { id } = useParams(); // Movie ID from URL
  //estados
  const [commentsData, setCommentsData] = useState([]);
  const [filteredcomments, setFilteredComments] = useState([]);
  const [isLoggin, setIsLoggin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [newComment, setNewComment] = useState("");

  // funciones
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      try {
        const responseUser = await axios.get("/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(responseUser.data);
        const response = await axios.get(`/comments/`);
        const responseMovie = await axios.get(`/movies/${id}/`);
        setCommentsData(response.data);
        setMovieData(responseMovie.data);
        const filterComments = response.data.filter((comment) => {
          return comment.movie === parseInt(id);
        });
        console.log(filteredcomments);
        setFilteredComments(filterComments);
      } catch (err) {
        setIsLoggin(false);
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    if (userData) {
      setIsLoggin(true);
    } else {
      setIsLoggin(false);
    }
  }, [userData]);

  const handlePostComment = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(
        `/comments/`,
        {
          content: newComment,
          user: userData.id,
          movie: movieData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      // updated comments
      const response = await axios.get(`/comments/`);
      setCommentsData(response.data);
      const filterComments = response.data.filter((comment) => {
        console.log(comment.movie.id);
        return comment.movie === parseInt(id);
      });
      setFilteredComments(filterComments);
      setCommentsData(response.data);
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
      <h3>Comentarios</h3>
      <Box
        sx={{
          bgcolor: "secondary.main",
          my: filteredcomments.length > 0 ? 1 : 0,
          p: filteredcomments.length > 0 ? 1 : 0,
          borderRadius: 2,
        }}
      >
        {filteredcomments.map((comment) => (
          <Box key={comment.id} sx={{ borderBottom: "1px solid white", py: 1 }}>
            <strong>{userData.username}</strong>
            <p>{comment.content}</p>
            <small>{new Date(comment.created_at).toLocaleString()}</small>
          </Box>
        ))}
      </Box>
      <TextField
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe un comentario..."
        sx={{ my: 1, border: "1px solid white", borderRadius: 2 }}
      />
      <Button
        disabled={!isLoggin}
        variant="contained"
        onClick={handlePostComment}
      >
        Enviar
      </Button>
      <Box>
        {isLoggin
          ? "Puedes agregar tu comentario"
          : "Para agregar un comentario es necesario estar logeado"}
      </Box>
    </Box>
  );
};

export default CommentsSeccion;
