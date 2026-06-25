import Favorite from '../models/favorite.model.js';
import Property from '../models/property.model.js';

export const addFavorite = async (req, res) => {
    try {
        const { propertyId } = req.body;
        if (!propertyId) {
            return res.status(400).json({ message: 'propertyId is required' });
        }
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        const existing = await Favorite.findOne({ tenantId: req.user.id, propertyId });
        if (existing) {
            return res.status(400).json({ message: 'Already in favorites' });
        }
        const favorite = new Favorite({ tenantId: req.user.id, propertyId });
        await favorite.save();
        res.status(201).json({ message: 'Added to favorites', favorite });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add favorite', error: error.message });
    }
};

export const getMyFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ tenantId: req.user.id })
            .populate('propertyId')
            .sort({ createdAt: -1 });
        res.json({ favorites });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch favorites', error: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        if (favorite.tenantId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await favorite.deleteOne();
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove favorite', error: error.message });
    }
};

export const checkFavorite = async (req, res) => {
    try {
        const { propertyId } = req.query;
        if (!propertyId) {
            return res.status(400).json({ message: 'propertyId is required' });
        }
        const favorite = await Favorite.findOne({ tenantId: req.user.id, propertyId });
        res.json({ isFavorite: !!favorite, favoriteId: favorite?._id || null });
    } catch (error) {
        res.status(500).json({ message: 'Failed to check favorite', error: error.message });
    }
};