import express from 'express';
import { getWellnessScore } from '../controllers/wellnessController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.route('/:petId').get(protect, getWellnessScore);

export default router;