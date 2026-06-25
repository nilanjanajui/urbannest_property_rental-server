import express from 'express';
import { getPropertyReviews, createReview, getHomeReviews } from '../controllers/review.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = express.Router();

router.get('/home', getHomeReviews);
router.get('/', getPropertyReviews);
router.post('/', requireAuth, requireRole('tenant'), createReview);

export default router;