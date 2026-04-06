import express from 'express';
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAchievements)
  .post(protect, createAchievement);

router.route('/:id')
  .get(getAchievement)
  .put(protect, updateAchievement)
  .delete(protect, deleteAchievement);

export default router;
