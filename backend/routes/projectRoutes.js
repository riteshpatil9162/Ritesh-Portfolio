import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, upload.single('image'), createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, upload.single('image'), updateProject)
  .delete(protect, deleteProject);

export default router;
