import Pet from '../models/Pet.mjs';

// @desc    Add a new event to a pet's health timeline
// @route   POST /api/timeline/:petId
// @access  Private
export const addTimelineEvent = async (req, res) => {
  const { petId } = req.params;
  const { type, date, title, details } = req.body;

  try {
    const pet = await Pet.findById(petId);
    if (!pet || pet.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const newEvent = {
      // Mongoose will add a unique _id automatically
      type,
      date,
      title,
      details,
    };

    pet.healthTimeline.push(newEvent);
    await pet.save();

    res.status(201).json(pet.healthTimeline);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};