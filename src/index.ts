import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { inquiryRoutes } from "./routes/inquiry.routes";
import { propertyRoutes } from "./routes/property.routes";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/real-estate";

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
