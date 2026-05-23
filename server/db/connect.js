const dns = require("dns");
const path = require("path");
const mongoose = require("mongoose");

// Windows often blocks SRV lookups on system DNS — use public DNS for MongoDB Atlas
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGODB_URI_STANDARD;

  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI in server/.env — copy the Atlas connection string."
    );
  }

  const options = {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  };

  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri, options);
      console.log("MongoDB connected");
      return;
    } catch (error) {
      lastError = error;
      console.warn(
        `MongoDB connect attempt ${attempt}/${MAX_RETRIES} failed:`,
        error.message
      );

      await mongoose.disconnect().catch(() => {});

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS);
      }
    }
  }

  let help = "";

  if (lastError.message.includes("querySrv")) {
    help =
      "\n\nDNS could not resolve mongodb+srv. The server now uses Google DNS (8.8.8.8).\n" +
      "If this persists, set MONGODB_URI_STANDARD in .env with the standard mongodb:// string from Atlas.";
  } else if (
    lastError.message.includes("timed out") ||
    lastError.message.includes("Server selection")
  ) {
    help =
      "\n\n→ Atlas is blocking your network.\n" +
      "  MongoDB Atlas → Network Access → Add IP Address → Add Current IP\n" +
      "  (or 0.0.0.0/0 for testing). Wait 2 minutes and run npm run dev again.";
  } else if (
    lastError.message.includes("bad auth") ||
    lastError.code === 8000
  ) {
    help =
      "\n\n→ Wrong username/password in .env.\n" +
      "  Check Atlas → Database Access → user logith1234.";
  }

  throw new Error(lastError.message + help);
};

module.exports = connectDB;
