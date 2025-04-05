import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { getOrCreateUser } from 'controllers/user.controller';

// Configure passport strategies
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user logic
      let user = getOrCreateUser(profile.id, profile.displayName, profile.emails?.[0]?.value!);
      
      return done(null, user);
    } catch (error) {
      done(error as Error, undefined);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const Users = mongoose.model("User", User);
    const user = await Users.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;