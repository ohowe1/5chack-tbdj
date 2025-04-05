import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import { User } from '../models/user.model';

// Configure passport strategies
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const Users = mongoose.model("User", User);
    try {
      // Find or create user logic
      let user = await Users.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await Users.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
        });
      }
      
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