import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

export default router;
