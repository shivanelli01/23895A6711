import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  // Function to generate a dummy short code
  const generateShortUrl = () => {
    if (!longUrl) return;
    const shortCode = Math.random().toString(36).substring(2, 8); // random 6 chars
    setShortUrl(`http://short.ly/${shortCode}`);
  };

  // Function to copy short URL
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("✅ Short URL copied to clipboard!");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        🚀 URL Shortener
      </Typography>

      <TextField
        fullWidth
        label="Enter your long URL"
        variant="outlined"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={generateShortUrl}>
        Shorten URL
      </Button>

      {shortUrl && (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6">
            <a href={longUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </Typography>
          <IconButton color="primary" onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
      )}
    </Container>
  );
}

export default App;
