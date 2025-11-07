import express from "express";
import apiRouter from "./api/index.js";
import path from "path";

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Main API router
app.use("/api/v1", apiRouter);

export default app;
