import express from "express";
const router = express.Router();
import {
  getStorys,
  getStoryById,
  getStoriesByAuthorId,
  createStory,
  updateStory,
  deleteStory,
  createStoryReview,
  getTopStorys,
} from '../controllers/storyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
router.route('/author/:authorId').get(getStoriesByAuthorId);
router.route('/').get(getStorys).post(protect, admin, createStory);
router.route('/:id/reviews').post(protect, checkObjectId, createStoryReview);
router.get('/top', getTopStorys);
router
  .route('/:id')
  .get(checkObjectId, getStoryById)
  .put(protect, admin, checkObjectId, updateStory)
  .delete(protect, admin, checkObjectId, deleteStory);

export default router;

