import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config({ path: './.env' });

const emailuser = process.env.EMAIL_USER;
const emailpass = process.env.EMAIL_PASS;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;



passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        // 1) Try to find user by googleId
        let user = await User.findOne({ googleId });

        // 2) If not found, but email exists, link with existing local account
        if (!user && email) {
          user = await User.findOne({ email });
        }

        // 3) If still no user, create new one
        if (!user) {
          const randomPassword = crypto.randomBytes(16).toString('hex');

          user = await User.create({
            email,
            name,
            googleId,
            verified: true, // Google users are treated as verified
            password: await bcrypt.hash(randomPassword, 10), // dummy password
          });
        } else {
          // Make sure account is marked as verified and googleId is set
          if (!user.googleId) user.googleId = googleId;
          if (!user.verified) user.verified = true;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error('Google OAuth error:', err);
        return done(err, null);
      }
    }
  )
);

// //  if you use session-based auth with passport
// passport.serializeUser((user, done) => {
//   done(null, user.id); // store user id in session
// });

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


// Email transporter setup with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailuser,
    pass: emailpass,
  },
});



export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    // Send verification email
    const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${verificationToken}`;
    try {
      await transporter.sendMail({
        from: emailuser,
        to: email,
        subject: 'Verify Your Email',
        text: `Click the link to verify your email: ${verificationLink}`,
      });
    } catch (error) {
      console.log(error);
    }

    // Send response with success message
    res.status(201).json({
      message: 'Signup successful! Please check your email to verify your account.',
      redirect: '/login', // Redirect to login page
    });
  } catch (error) {
    console.log('check');
    res.status(500).json({ message: 'Signup failed', error });
  }
};



export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send(`
          <html>
            <head>
              <title>Email Verification Failed</title>
              <style>
                body { font-family: Arial; background: #f8d7da; text-align: center; padding-top: 80px; }
                .box { background: white; width: 450px; margin: auto; padding: 25px; border-radius: 10px; }
                h1 { color: #842029; }
                a { text-decoration: none; color: #0d6efd; }
              </style>
            </head>
            <body>
              <div class="box">
                <h1>❌ Verification Failed</h1>
                <p>Invalid or expired token.</p>
                <a href="http://localhost:5173/auth">Go to Login</a>
              </div>
            </body>
          </html>
        `);
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).send(`
        <html>
          <head>
            <title>Email Verified</title>
            <style>
              body { font-family: Arial; background: #d1e7dd; text-align: center; padding-top: 80px; }
              .box { background: white; width: 450px; margin: auto; padding: 25px; border-radius: 10px; }
              h1 { color: #0f5132; }
              a { text-decoration: none; color: #0d6efd; }
            </style>
          </head>
          <body>
            <div class="box">
              <h1>✔️ Email Verified Successfully</h1>
              <p>You can now log in to your account.</p>
              <a href="http://localhost:5173/auth">Login Now</a>
            </div>
          </body>
        </html>
      `);
  } catch (error) {
    console.error('Email verification error:', error);

    return res.status(500).send(`
        <html>
          <head>
            <title>Error</title>
            <style>
              body { font-family: Arial; background: #fff3cd; text-align: center; padding-top: 80px; }
              .box { background: white; width: 450px; margin: auto; padding: 25px; border-radius: 10px; }
              h1 { color: #664d03; }
            </style>
          </head>
          <body>
            <div class="box">
              <h1>⚠️ Something went wrong</h1>
              <p>Email verification failed. Please try again later.</p>
            </div>
          </body>
        </html>
      `);
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the user is verified
    if (!existingUser.verified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    // Compare the password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
};

export default passport;
