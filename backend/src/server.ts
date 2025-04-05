import express, { Application } from 'express';
import pino from 'pino';
import connectDB from './core/db';
import indexRoutes from './routes/index.route';

const app: Application = express();
const logger = pino();

// Log that the server is starting
logger.info('Starting the server...');

// Connect to MongoDB
(async () => {
  try {
    await connectDB(logger);
    logger.info('Successfully connected to MongoDB');
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

// Middleware and routes
app.use(express.json()); // Parse JSON requests
app.use('/api/v3', indexRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
