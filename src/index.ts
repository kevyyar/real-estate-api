import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import { contactRoutes } from "./routes/contact.routes";
import { inquiryRoutes } from "./routes/inquiry.routes";
import { propertyRoutes } from "./routes/property.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
