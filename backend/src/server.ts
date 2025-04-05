import express, { Application } from 'express';
import session from 'express-session';
import auth from './config/auth';

const app: Application = express();

// Middleware for sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(auth.initialize());
app.use(auth.session());

// Google OAuth Routes
app.get(
  '/auth/google',
  auth.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  auth.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile'); // Redirect to a profile page after successful login
  }
);

// Protected Route
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.send(`Hello, ${(req.user as any).name}`);
});

// Start the server
const PORT = process.env.BACKEND_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});