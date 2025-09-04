import { loadUrls } from "../utils/storage";
import { useState, useEffect } from "react";
import { Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function StatsPage({ urls }) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(loadUrls());
  }, [urls]);

  return (
    <Box sx={{ p: 3 }}>
      <h2>Statistics</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(data).map((u) => (
            <TableRow key={u.code}>
              <TableCell>
                <a href={`/${u.code}`}>{window.location.origin}/{u.code}</a>
              </TableCell>
              <TableCell>{u.longUrl}</TableCell>
              <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(u.expiresAt).toLocaleString()}</TableCell>
              <TableCell>{u.clicks.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}