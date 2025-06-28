import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String, // for Google OAuth
}, { timestamps: true });

export default mongoose.model('User', userSchema);
