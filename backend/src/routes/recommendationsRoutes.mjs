import express from 'express';
import { getHealthRecommendations } from '../controllers/recommendationsController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.route('/:petId').get(protect, getHealthRecommendations);

export default router;