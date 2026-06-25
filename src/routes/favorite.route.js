import express from 'express';
import {
    addFavorite,
    getMyFavorites,
    removeFavorite,
    checkFavorite,
} from '../controllers/favorite.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = express.Router();

// Named routes before /:id
router.get('/mine', requireAuth, requireRole('tenant'), getMyFavorites);
router.get('/check', requireAuth, requireRole('tenant'), checkFavorite);
router.post('/', requireAuth, requireRole('tenant'), addFavorite);
router.delete('/:id', requireAuth, requireRole('tenant'), removeFavorite);

export default router;