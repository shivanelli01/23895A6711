import { Log } from "../loggingMiddleware";

function generateCode(length = 6) {
  return Math.random().toString(36).substr(2, length);
}

export function createShortUrl(longUrl, validity, customCode, existing) {
  try {
    if (!/^https?:\/\/.+\..+/.test(longUrl)) {
      throw new Error("Invalid URL format");
    }
    let code = customCode || generateCode();
    while (existing[code]) {
      code = generateCode();
    }
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + (validity || 30) * 60000);
    const shortUrl = { code, longUrl, createdAt, expiresAt, clicks: [] };
    Log("frontend", "info", "utils", `Created short URL ${code}`);
    return shortUrl;
  } catch (err) {
    Log("frontend", "error", "utils", err.message);
    throw err;
  }
}