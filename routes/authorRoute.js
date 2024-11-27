import express from "express";
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import { getAuthor, getAuthorById , createStoryReview} from "../controllers/authorController.js";

router.route("/").get(getAuthor);

router.route("/:id").get(getAuthorById);
router.route('/:id/reviews').post(protect, checkObjectId, createStoryReview);
export default router;
