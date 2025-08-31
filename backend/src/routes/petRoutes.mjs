import express from 'express';
import { addPet, getMyPets, getPetById, updatePetDetails } from '../controllers/petController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.route('/')
  .post(protect, addPet)
  .get(protect, getMyPets);

router.route('/:id')
  .get(protect, getPetById)
  .put(protect, updatePetDetails);

export default router;