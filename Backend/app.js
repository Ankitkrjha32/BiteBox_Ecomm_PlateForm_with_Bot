import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js"; // Main routes file

const app = express();

// Middleware Setup
const corsOptions = {
  // /cors options //
  origin: ["http://localhost:3000", "*"], //
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json()); // Parse JSON requests
// app.use("/", (req, res) => {
//     res.json({ message: "Hello from the backend!" });
// })
// Declare API routes
app.use("/api", apiRoutes); // Attach all API routes

export { app };
