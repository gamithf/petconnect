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
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  neutered: {
    type: Boolean,
  },
  weight: {
    type: String,
  },
  healthTimeline: {
    type: Array,
    default: []
  },
  journal: {
    type: Array,
    default: []
  },

  avatarUrl: {
    type: String,
    default: '', // You can set a default pet avatar image URL here
  },
  
  careSheet: {
    feeding: {
      instructions: { type: String, default: 'Not specified' },
      schedule: { type: String, default: 'Not specified' },
    },
    medications: { type: [String], default: [] },
    routine: { type: String, default: 'Not specified' },
  },
  
  emergencyContacts: {
    vet: {
      name: { type: String, default: 'Not specified' },
      address: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    hospital: {
      name: { type: String, default: 'Not specified' },
      address: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
  },
  behavioralNotes: {
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    general: { type: String, default: 'A very good pet!' },
  }

}, { timestamps: true });

// Mongoose returns _id. We'll add a virtual 'id' field for frontend compatibility.
petSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
petSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.model('Pet', petSchema);