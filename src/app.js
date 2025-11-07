import express from "express";
import api from "./api/index.js";
import cors from "cors";
import { notFoundHandler, errorHandler } from "./middlewares.js"; // correct

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", api);

// should be the last
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
