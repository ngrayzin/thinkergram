import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import Confetti from "react-confetti";

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;

const ExampleComponent = ({ confetti, setConfetti }) => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#333");
  const [fontSize, setFontSize] = useState(32);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFunkyIncrement = () => {
    const delta = getRandomInt(-5, 10);
    setCount(count + delta);
    setColor(getRandomColor());
    setFontSize(getRandomInt(32, 64));
    setConfetti(true);
    setTimeout(() => setConfetti(false), 800);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="300px"
      position="relative"
    >
      {confetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150}
        />
      )}
      <Paper elevation={4} sx={{ p: 4, textAlign: "center", minWidth: 320 }}>
        <Typography
          variant="h4"
          sx={{ color, mb: 2, fontSize: fontSize * 0.7 }}
        >
          Stupid counter
        </Typography>
        <Button
          variant="contained"
          onClick={handleFunkyIncrement}
          sx={{
            background: color,
            color: "#fff",
            fontWeight: "bold",
            mb: 2,
            fontSize: fontSize * 0.4,
            "&:hover": {
              background: color,
              opacity: 0.85,
            },
          }}
        >
          Funky Increment
        </Button>
        <Typography
          variant="h3"
          sx={{
            color,
            fontWeight: "bold",
            fontSize: fontSize,
            transition: "font-size 0.3s",
          }}
        >
          Count: {count}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ExampleComponent;
