import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import './auth/googleAuth.mjs';

// routes
import userRouters from './routes/userRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import adoptionLostRoutes from './routes/adoptionLostRoutes.mjs';
import petRoutes from './routes/petRoutes.mjs';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://petconnect-92xg.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Passport session setup
app.use(session({
  secret: 'sessionsecret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/api', (req, res) => {
  res.status(200).send({
    msg: 'Hello From PetConnect Backend!',
    data: 'This will be the template for the responses of PetConnect backend APIs',
    status: 'success',
  });
});

app.use('/api/users', userRouters);
app.use('/auth', authRoutes);
app.use('/api/adoption-lost', adoptionLostRoutes);
app.use('/api/pets', petRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/`);
});

