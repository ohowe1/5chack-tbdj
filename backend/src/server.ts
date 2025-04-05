import express, { Application } from 'express';
import pino from 'pino';
import connectDB from './core/db';

import indexRoutes from './routes/index.route';

const app: Application = express();
const logger = pino();

logger.info('Starting the server...');

connectDB(logger);

app.use("/api/v3", indexRoutes);

