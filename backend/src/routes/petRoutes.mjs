import express from 'express';
import { addPet, getMyPets } from '../controllers/petController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.route('/')
  .post(protect, addPet)
  .get(protect, getMyPets);

export default router;