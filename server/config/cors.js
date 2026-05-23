const cors = require("cors");

const buildAllowedOrigins = () => {
  const origins = new Set([
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
  ]);

  if (process.env.CLIENT_URL) {
    origins.add(process.env.CLIENT_URL.replace(/\/$/, ""));
  }

  if (process.env.CORS_ORIGINS) {
    process.env.CORS_ORIGINS.split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean)
      .forEach((origin) => origins.add(origin));
  }

  return origins;
};

const allowedOrigins = buildAllowedOrigins();

const isAllowedOrigin = (origin) => {
  const normalized = origin.replace(/\/$/, "");

  if (allowedOrigins.has(normalized)) {
    return true;
  }

  if (/^https:\/\/[\w.-]+\.vercel\.app$/.test(normalized)) {
    return true;
  }

  if (
    process.env.NODE_ENV !== "production" &&
    /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(normalized)
  ) {
    return true;
  }

  return false;
};

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    console.warn(`CORS blocked request from: ${origin}`);
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = cors(corsOptions);
