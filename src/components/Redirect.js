import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Log } from "../utils/loggingMiddleware";

function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("urls")) || [];
    let urlData = stored.find((u) => u.shortcode === shortcode);

    if (urlData) {
      const now = new Date();
      if (new Date(urlData.expiresAt) > now) {
        // Log click
        urlData.clicks.push({
          timestamp: new Date(),
          source: document.referrer || "Direct",
          location: "Unknown",
        });

        localStorage.setItem("urls", JSON.stringify(stored));
        Log("Frontend", "info", "Redirect", `Redirected to ${urlData.original}`);
        window.location.href = urlData.original;
      } else {
        alert("❌ This link has expired!");
      }
    } else {
      alert("❌ Invalid short URL");
    }
  }, [shortcode]);

  return <h2>Redirecting...</h2>;
}

export default RedirectPage;
