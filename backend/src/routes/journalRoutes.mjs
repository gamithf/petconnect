import express from 'express';
import { addJournalEntry, getJournalEntries } from '../controllers/journalController.mjs';
import { protect } from '../middleware/auth.mjs';

const router = express.Router();

router.route('/:petId')
  .post(protect, addJournalEntry)
  .get(protect, getJournalEntries);

export default router;