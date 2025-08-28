import express from 'express';
import { addTimelineEvent } from '../controllers/timelineController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.route('/:petId').post(protect, addTimelineEvent);

export default router;