import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createShortUrl } from "../utils/shortener";
import { saveUrls, loadUrls } from "../utils/storage";
import { Log } from "../loggingMiddleware";

export default function ShortenerPage({ setUrls }) {
  const [inputs, setInputs] = useState([{ longUrl: "", validity: "", code: "" }]);

  const handleChange = (i, field, value) => {
    const updated = [...inputs];
    updated[i][field] = value;
    setInputs(updated);
  };

  const addRow = () => {
    if (inputs.length < 5) setInputs([...inputs, { longUrl: "", validity: "", code: "" }]);
  };

  const handleSubmit = () => {
    const existing = loadUrls();
    try {
      inputs.forEach((item) => {
        if (item.longUrl) {
          const url = createShortUrl(
            item.longUrl,
            parseInt(item.validity) || 30,
            item.code,
            existing
          );
          existing[url.code] = url;
        }
      });
      saveUrls(existing);
      setUrls(existing);
      Log("frontend", "info", "page", "URLs shortened successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <h2>URL Shortener</h2>
      {inputs.map((row, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Original URL"
            value={row.longUrl}
            onChange={(e) => handleChange(i, "longUrl", e.target.value)}
            fullWidth
          />
          <TextField
            label="Validity (minutes)"
            value={row.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
            type="number"
          />
          <TextField
            label="Custom Code"
            value={row.code}
            onChange={(e) => handleChange(i, "code", e.target.value)}
          />
        </Box>
      ))}
      <Button onClick={addRow}>+ Add</Button>
      <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>
        Shorten
      </Button>
    </Box>
  );
}