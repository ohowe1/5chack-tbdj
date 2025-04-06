import auth from './config/auth';
import session from 'express-session';
import express, { Application } from "express";
import pino from "pino";
import connectDB from "./core/db";
import cors from "cors";
import loggerMiddleware from "pino-http";

import indexRoutes from "./routes/index.route";
import postRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";
import completionsRoutes from "./routes/completions.route";
import paymentRoutes from "./routes/payment.route";

const app: Application = express();

const logger = pino();
logger.level = "debug";

connectDB(logger);

// Middleware for sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport
app.use(auth.initialize());
app.use(auth.session());

const options: cors.CorsOptions = {
  origin: [
    `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
    `http://localhost:${process.env.PORT || 8080}`
  ],
  credentials: true,
};
logger.debug("CORS setup");

// Middleware
app.use(
  express.json(),
  loggerMiddleware({ logger: logger }),
  cors(options),
);


app.use('/', indexRoutes);
app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.use('/completions', completionsRoutes);
app.use('/payment', paymentRoutes)

app.get(
  '/auth/google',
  auth.authenticate('google', { scope: ['profile', 'email'] })
);
app.get(
  '/auth/google/callback',
  auth.authenticate('google', {
     failureRedirect: 'http://localhost:' + (process.env.FRONTEND_PORT || 3000) + '/login', // Redirect to login page on failure
     successRedirect: 'http://localhost:' + (process.env.FRONTEND_PORT || 3000) + '/', // Redirect to profile page on success
  }),
);

app.post('/auth/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Start the server
const PORT = process.env.BACKEND_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});