import express from 'express';
import { getAllPosts, createPost, getPost, deletePost, toggleLike, addComment} from '../controllers/adoptionLostController.mjs';
import { protect } from '../middleware/auth.mjs';
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router();

router.post('/', protect, upload.single("file"),createPost);
router.get('/', protect, getAllPosts);
router.get('/user', protect, getPost);
router.delete('/:id', protect, deletePost);
router.patch('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);

export default router;