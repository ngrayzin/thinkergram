import React, { useRef, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Box,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const LONG_PRESS_DURATION = 500; // ms

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const timerRef = useRef();
  const theme = useTheme();

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => setOpen(true), LONG_PRESS_DURATION);
  };
  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleClick = () => {
    if (!open) navigate(`/post/${post.id}`);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 345,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardActionArea
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          <CardMedia
            component="img"
            height="140"
            image={post.image}
            alt="post"
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: theme.shape.borderRadius,
              borderTopRightRadius: theme.shape.borderRadius,
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: 700 }}
            >
              {post.caption}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description || " "}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClick}>
            View
          </Button>
          <Button size="small" color="secondary" onClick={() => setOpen(true)}>
            Enlarge
          </Button>
        </CardActions>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme.palette.background.paper,
            boxShadow: 24,
            p: 2,
            outline: "none",
            maxWidth: 700,
            width: "95%",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={post.image}
            alt="enlarged"
            style={{
              width: "100%",
              maxWidth: 600,
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: 8,
              background: theme.palette.grey[100],
            }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {post.caption}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default PostCard;
