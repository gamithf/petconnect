import Pet from '../models/Pet.mjs';

export const addPet = async (req, res) => {
  try {
    const { name, type, breed, age } = req.body;
    const newPet = new Pet({
      owner: req.user.id,
      name,
      type,
      breed,
      age,
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user.id });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};