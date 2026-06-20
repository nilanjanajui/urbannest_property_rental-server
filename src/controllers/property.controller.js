import Property from '../models/property.model.js';

// POST /api/properties
export const createProperty = async (req, res) => {
    try {
        const property = new Property({
            ...req.body,
            ownerId: req.user.id,
            status: 'pending',
        });
        await property.save();
        res.status(201).json({ message: 'Property created successfully', property });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create property', error: error.message });
    }
};

// GET /api/properties  (public)
export const getAllProperties = async (req, res) => {
    try {
        const { search, type, sort, page = 1, limit = 9, minPrice, maxPrice } = req.query;

        const filter = { status: 'approved' };

        if (search) {
            filter.location = { $regex: search, $options: 'i' };
        }
        if (type) {
            filter.type = type;
        }
        if (minPrice || maxPrice) {
            filter.rent = {};
            if (minPrice) filter.rent.$gte = Number(minPrice);
            if (maxPrice) filter.rent.$lte = Number(maxPrice);
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { rent: 1 };
        if (sort === 'price_desc') sortOption = { rent: -1 };

        const skip = (Number(page) - 1) * Number(limit);

        const [properties, total] = await Promise.all([
            Property.find(filter)
                .sort(sortOption)
                .skip(skip)
                .limit(Number(limit))
                .populate('ownerId', 'name email'),
            Property.countDocuments(filter),
        ]);

        res.json({
            properties,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
    }
};

// GET /api/properties/featured  (public)
export const getFeaturedProperties = async (req, res) => {
    try {
        const properties = await Property.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .limit(6)
            .populate('ownerId', 'name email');
        res.json({ properties });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch featured properties', error: error.message });
    }
};

// GET /api/properties/:id  (requireAuth)
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate(
            'ownerId',
            'name email photo'
        );
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ property });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch property', error: error.message });
    }
};

// PATCH /api/properties/:id  (requireAuth + requireRole owner)
export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        if (property.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own properties' });
        }
        const updated = await Property.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        res.json({ message: 'Property updated successfully', property: updated });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update property', error: error.message });
    }
};

// DELETE /api/properties/:id  (requireAuth + requireRole owner)
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        if (property.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own properties' });
        }
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete property', error: error.message });
    }
};