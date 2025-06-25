import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const AddPostModal = ({
  open,
  onClose,
  onSubmit,
  loading,
  error,
  initialData,
}) => {
  const [imgUrl, setImgUrl] = useState(initialData?.image || "");
  const [description, setDescription] = useState(initialData?.caption || "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setImgUrl(initialData?.image || "");
    setDescription(initialData?.caption || "");
  }, [initialData, open]);

  const isValid = imgUrl && description.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      onSubmit({ image: imgUrl, caption: description });
      setImgUrl("");
      setDescription("");
      setTouched(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Post
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            onBlur={() => setTouched(true)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setTouched(true)}
            error={touched && !description}
            helperText={
              touched && !description ? "Description is required." : ""
            }
            fullWidth
            multiline
            minRows={2}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || loading}
            fullWidth
          >
            {loading ? "Saving..." : initialData ? "Update" : "Post"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddPostModal;
