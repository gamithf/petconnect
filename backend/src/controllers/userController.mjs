import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  user.password = undefined;

  res.status(201).json({ 
    msg: 'User registered successfully',
    data: { token: generateToken(user), user },
    status: 'success'
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    // Remove password from user object before sending response
    user.password = undefined; // Ensure password is not sent in response

     res.cookie('auth_token', generateToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', 
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ 
      msg: 'User logged in successfully',
      data: { token: generateToken(user), user },
      status: 'success'
    });
  } else {
    res.status(401).json({ 
      msg: 'Invalid email or password',
      data: null,
      status: 'error'
    });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({
    msg: 'User profile retrieved successfully',
    data: user,
    status: 'success'
  });
};
