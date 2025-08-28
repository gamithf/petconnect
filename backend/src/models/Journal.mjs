import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mood: { type: String, required: true },
  energy: { type: String, required: true },
  appetite: { type: String, required: true },
  poop: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model('Journal', journalSchema);