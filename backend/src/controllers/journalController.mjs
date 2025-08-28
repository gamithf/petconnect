// controllers/journalController.mjs
import Journal from '../models/Journal.mjs';
import Pet from '../models/Pet.mjs';
import mongoose from 'mongoose';

// @desc    Add a new journal entry for a pet
// @route   POST /api/journal/:petId
// @access  Private
export const addJournalEntry = async (req, res) => {
  const { petId } = req.params;
  const { mood, energy, appetite, poop, notes } = req.body;

  try {
    const pet = await Pet.findById(petId);
    if (!pet || pet.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Check if an entry for today already exists for this pet
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const existingEntry = await Journal.findOne({
      pet: petId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (existingEntry) {
      return res.status(409).json({ message: 'A journal entry for today already exists.' });
    }

    const newEntry = new Journal({
      pet: petId,
      owner: req.user.id,
      date: new Date(),
      mood,
      energy,
      appetite,
      poop,
      notes,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get all journal entries for a pet
// @route   GET /api/journal/:petId
// @access  Private
export const getJournalEntries = async (req, res) => {
  const { petId } = req.params;
  try {
    const pet = await Pet.findById(petId);
    if (!pet || pet.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const entries = await Journal.find({ pet: petId }).sort({ date: -1 }); // Newest first
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};