import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import geAllPost from "./api/getpost";
import post from "./api/post";
import Confetti from "react-confetti";
import PostDetail from "./components/PostDetail";
import Grid from "@mui/material/Grid";
import {
  Box,
  Container,
  Typography,
  Fab,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExampleComponent from "./components/ExampleComponent";
import PostCard from "./components/PostCard";
import AddPostModal from "./components/AddPostModal";

const Feed = ({ setConfetti }) => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postError, setPostError] = useState("");

  const fetchPosts = async () => {
    const data = await geAllPost();
    if (Array.isArray(data)) setPosts(data.reverse());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (newPost) => {
    setLoading(true);
    setPostError("");
    const res = await post(newPost);
    setLoading(false);
    if (res && !res.message) {
      setShowModal(false);
      fetchPosts();
      setConfetti(true);
      setTimeout(() => setConfetti(false), 800);
    } else {
      setPostError(`${res.message || "Unknown error"} please try again.`);
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ pt: 5, pb: 10 }}>
        {posts.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No posts yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {posts.map((p, i) => (
              <Grid item xs={12} sm={6} md={5} key={i}>
                <PostCard post={p} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1200,
        }}
        onClick={() => setShowModal(true)}
      >
        <AddIcon />
      </Fab>
      <AddPostModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddPost}
        loading={loading}
        error={postError}
      />
    </Box>
  );
};

const App = () => {
  const [confetti, setConfetti] = useState(false);

  return (
    <Router>
      {confetti && (
        <Confetti
          numberOfPieces={150}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      <AppBar position="sticky" color="primary" elevation={0} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
              textDecoration: "none",
              color: "inherit",
            }}
            component={Link}
            to="/"
          >
            Thinkergram
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Feed
          </Button>
          <Button color="inherit" component={Link} to="/fun">
            Funky Counter
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Feed setConfetti={setConfetti} />} />
          <Route
            path="/fun"
            element={
              <ExampleComponent confetti={confetti} setConfetti={setConfetti} />
            }
          />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
