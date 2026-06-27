import express from 'express';
import {
    createProperty,
    getAllProperties,
    getFeaturedProperties,
    getPropertyById,
    getOwnerProperties,
    getAllAdminProperties,
    updateProperty,
    updatePropertyStatus,
    deleteProperty,
} from '../controllers/property.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = express.Router();

// Public
router.get('/', getAllProperties);
router.get('/featured', getFeaturedProperties);

// Named routes BEFORE /:id
router.get('/owner/mine', requireAuth, requireRole('owner'), getOwnerProperties);
router.get('/admin/all', requireAuth, requireRole('admin'), getAllAdminProperties);

// Owner create
router.post('/', requireAuth, requireRole('owner'), createProperty);

// Protected param routes
router.patch('/:id/status', requireAuth, requireRole('admin'), updatePropertyStatus);
router.get('/:id', requireAuth, getPropertyById);
router.patch('/:id', requireAuth, updateProperty);
router.delete('/:id', requireAuth, deleteProperty);

export default router;