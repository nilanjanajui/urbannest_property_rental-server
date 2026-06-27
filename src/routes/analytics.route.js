import { Router } from 'express';
import { getOwnerAnalytics } from '../controllers/analytics.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = Router();

router.get('/owner', requireAuth, requireRole('owner'), getOwnerAnalytics);

export default router;