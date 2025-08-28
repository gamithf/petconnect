import Pet from '../models/Pet.mjs';

export const addPet = async (req, res) => {
  try {
    const { name, type, breed, age, gender, neutered, weight } = req.body;
    const newPet = new Pet({
      owner: req.user.id,
      name,
      type,
      breed,
      age,
      gender,
      weight,
      neutered: neutered === 'Yes',
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user.id });
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get a single pet by ID
// @route   GET /api/pets/:id
// @access  Private
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Security check: Ensure the logged-in user owns this pet
    if (pet.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};