import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { Log } from "../utils/loggingMiddleware";

function Shortener() {
  const [urls, setUrls] = useState([""]);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    if (!newUrls[index]) newUrls[index] = {};
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const generateShortcode = () => Math.random().toString(36).substring(2, 7);

  const handleShorten = () => {
    let shortened = urls.map((item) => {
      if (!item.original) return null;

      let shortcode = item.shortcode || generateShortcode();
      let validity = item.validity ? parseInt(item.validity) : 30;

      const data = {
        original: item.original,
        shortcode,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + validity * 60000),
        clicks: [],
      };

      Log("Frontend", "info", "Shortener", `Created short URL: ${shortcode}`);

      return data;
    }).filter(Boolean);

    setResults(shortened);

    // save in localStorage
    let stored = JSON.parse(localStorage.getItem("urls")) || [];
    localStorage.setItem("urls", JSON.stringify([...stored, ...shortened]));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Shorten up to 5 URLs</Typography>
      {urls.map((item, index) => (
        <Card key={index} sx={{ mt: 2 }}>
          <CardContent>
            <TextField
              fullWidth
              label="Original URL"
              onChange={(e) => handleInputChange(index, "original", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Validity (minutes, optional)"
              onChange={(e) => handleInputChange(index, "validity", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              onChange={(e) => handleInputChange(index, "shortcode", e.target.value)}
              sx={{ mb: 2 }}
            />
          </CardContent>
        </Card>
      ))}

      {urls.length < 5 && (
        <Button sx={{ mt: 2 }} onClick={() => setUrls([...urls, {}])}>
          ➕ Add Another
        </Button>
      )}

      <br />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleShorten}>
        Shorten URLs
      </Button>

      <div style={{ marginTop: "20px" }}>
        {results.map((item, idx) => (
          <Card key={idx} sx={{ mt: 2 }}>
            <CardContent>
              <Typography>Original: {item.original}</Typography>
              <Typography>
                Short URL: <a href={`/${item.shortcode}`}>http://localhost:3000/{item.shortcode}</a>
              </Typography>
              <Typography>Expires At: {item.expiresAt.toString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Shortener;
