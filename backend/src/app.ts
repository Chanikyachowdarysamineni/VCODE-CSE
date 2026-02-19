import mongoose from "mongoose";
import express from "express";
import registerRoute from "./routes/register";
import EventRegistration from "./models/EventRegistration";
import HackathonRoute from "./routes/hackathon";
import CulturalRoute from "./routes/cultural";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Configure CORS origins - add frontend URL from environment variable
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8000",
  process.env.FRONTEND_URL, // Add your Render frontend URL here
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/hackathon";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.use("/api/hackathon", HackathonRoute);
app.use("/api/cultural", CulturalRoute);

app.use('/api/register', registerRoute);

app.use('/*', (req, res) => {
  res.status(404).send('404 Not Found1');
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
