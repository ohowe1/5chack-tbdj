import express, { Application } from "express";
import pino from "pino";
import connectDB from "./core/db";

import indexRoutes from "./routes/index.route";

const app: Application = express();
const logger = pino();

logger.info("Starting the server...");

// connectDB(logger);

// Middleware and routes
app.use(express.json()); // Parse JSON requests
app.use('/api/v3', indexRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
