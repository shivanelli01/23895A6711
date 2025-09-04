import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import { loadUrls, saveUrls } from "./utils/storage";
import { Log } from "./loggingMiddleware";

function Redirector() {
  const { code } = useParams();
  const urls = loadUrls();
  const entry = urls[code];
  const navigate = useNavigate();

  if (entry && new Date(entry.expiresAt) > new Date()) {
    entry.clicks.push({ timestamp: new Date() });
    saveUrls(urls);
    Log("frontend", "info", "route", `Redirected ${code}`);
    window.location.href = entry.longUrl;
  } else {
    return <h2>Invalid or expired link</h2>;
  }
  return null;
}

export default function App() {
  const [urls, setUrls] = useState(loadUrls());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenerPage setUrls={setUrls} />} />
        <Route path="/stats" element={<StatsPage urls={urls} />} />
        <Route path="/:code" element={<Redirector />} />
      </Routes>
    </BrowserRouter>
  );
}