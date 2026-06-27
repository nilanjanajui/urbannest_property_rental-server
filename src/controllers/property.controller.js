import Property from '../models/property.model.js';

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
        console.error('CREATE PROPERTY ERROR:', error);
        res.status(500).json({ message: 'Failed to create property', error: error.message });
    }
};

export const getAllProperties = async (req, res) => {
    try {
        const { search, type, sort, page = 1, limit = 9, minPrice, maxPrice } = req.query;

        const filter = { status: 'approved' };

        if (search) filter.location = { $regex: search, $options: 'i' };
        if (type) filter.type = type;
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
        console.error('GET ALL PROPERTIES ERROR:', error);
        res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
    }
};

export const getFeaturedProperties = async (req, res) => {
    try {
        const properties = await Property.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .limit(6)
            .populate('ownerId', 'name email');
        res.json({ properties });
    } catch (error) {
        console.error('GET FEATURED ERROR:', error);
        res.status(500).json({ message: 'Failed to fetch featured properties', error: error.message });
    }
};

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
        console.error('GET PROPERTY BY ID ERROR:', error);
        res.status(500).json({ message: 'Failed to fetch property', error: error.message });
    }
};

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
        console.error('UPDATE PROPERTY ERROR:', error);
        res.status(500).json({ message: 'Failed to update property', error: error.message });
    }
};

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
        console.error('DELETE PROPERTY ERROR:', error);
        res.status(500).json({ message: 'Failed to delete property', error: error.message });
    }
};

export const getOwnerProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        const filter = { ownerId: req.user.id };
        const [properties, total] = await Promise.all([
            Property.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Property.countDocuments(filter),
        ]);

        res.json({
            properties,
            pagination: { total, page, totalPages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('GET OWNER PROPERTIES ERROR:', error);
        res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
    }
};

export const updatePropertyStatus = async (req, res) => {
    try {
        const { status, rejectionFeedback } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const update = { status };
        if (status === 'rejected' && rejectionFeedback) {
            update.rejectionFeedback = rejectionFeedback;
        }

        const property = await Property.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!property) return res.status(404).json({ message: 'Property not found' });

        res.json({ message: `Property ${status} successfully`, property });
    } catch (error) {
        console.error('UPDATE PROPERTY STATUS ERROR:', error);
        res.status(500).json({ message: 'Failed to update status', error: error.message });
    }
};