// Petit serveur statique pour dist/ : WebGL refuse les images chargées en file://, les tests passent donc par http.
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "dist");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".txt": "text/plain" };
const port = +process.env.PORT || 4173;
http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(root, p === "/" ? "index.html" : p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}`));
