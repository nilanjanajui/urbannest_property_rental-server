import Review from '../models/review.model.js';

export const getPropertyReviews = async (req, res) => {
    try {
        const { propertyId } = req.query;
        if (!propertyId) {
            return res.status(400).json({ message: 'propertyId is required' });
        }
        const reviews = await Review.find({ propertyId }).sort({ createdAt: -1 });
        const avgRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;
        res.json({ reviews, avgRating: Number(avgRating), total: reviews.length });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

export const createReview = async (req, res) => {
    try {
        const { propertyId, rating, comment } = req.body;
        if (!propertyId || !rating || !comment) {
            return res.status(400).json({ message: 'propertyId, rating, and comment are required' });
        }
        const existing = await Review.findOne({ propertyId, tenantId: req.user.id });
        if (existing) {
            return res.status(400).json({ message: 'You have already reviewed this property' });
        }
        const review = new Review({
            propertyId,
            tenantId: req.user.id,
            name: req.user.name,
            email: req.user.email,
            rating: Number(rating),
            comment,
        });
        await review.save();
        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit review', error: error.message });
    }
};