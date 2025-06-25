import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getOnePost from "../api/getOnePost";
import deletePost from "../api/deletePost";
import updatePost from "../api/updatePost";
import AddPostModal from "./AddPostModal";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    getOnePost(id).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);

  const handleEdit = async (updatedData) => {
    const updated = await updatePost(id, updatedData);

    setEditOpen(false);
    setPost(updated);
  };

  const handleDelete = async () => {
    await deletePost(id);
    setDeleteOpen(false);
    navigate("/");
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (!post)
    return (
      <Typography align="center" mt={4}>
        Post not found.
      </Typography>
    );

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper sx={{ p: 3, maxWidth: 900, width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7}>
            <img
              src={post.image}
              alt="post"
              style={{ width: "100%", maxHeight: 600, objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {post.caption}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditOpen(true)}
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
        {/* Edit Modal */}
        <AddPostModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSubmit={handleEdit}
          loading={false}
          error={null}
          initialData={{ image: post.image, caption: post.caption }}
        />
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action will permanently delete the post.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default PostDetail;
