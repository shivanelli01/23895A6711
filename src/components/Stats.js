import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

function Stats() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("urls")) || [];
    setUrls(stored);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">📊 URL Statistics</Typography>
      {urls.map((item, idx) => (
        <Card key={idx} sx={{ mt: 2 }}>
          <CardContent>
            <Typography>Short: http://localhost:3000/{item.shortcode}</Typography>
            <Typography>Original: {item.original}</Typography>
            <Typography>Created: {new Date(item.createdAt).toString()}</Typography>
            <Typography>Expires: {new Date(item.expiresAt).toString()}</Typography>
            <Typography>Total Clicks: {item.clicks.length}</Typography>
            <Typography>Click Details:</Typography>
            <ul>
              {item.clicks.map((c, i) => (
                <li key={i}>
                  {new Date(c.timestamp).toString()} | {c.source} | {c.location}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Stats;
