import express from 'express';
import {
    createProperty,
    getAllProperties,
    getFeaturedProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
} from '../controllers/property.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = express.Router();

// Public
router.get('/', getAllProperties);
router.get('/featured', getFeaturedProperties);

// Protected
router.post('/', requireAuth, requireRole('owner'), createProperty);
router.get('/:id', requireAuth, getPropertyById);
router.patch('/:id', requireAuth, requireRole('owner'), updateProperty);
router.delete('/:id', requireAuth, requireRole('owner'), deleteProperty);

export default router;