import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['dog', 'cat'],
  },
  breed: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
}, { timestamps: true });

export default mongoose.model('Pet', petSchema);