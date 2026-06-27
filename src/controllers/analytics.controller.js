import mongoose from 'mongoose';
import Property from '../models/property.model.js';
import Booking from '../models/booking.model.js';
import Transaction from '../models/transaction.model.js';

export const getOwnerAnalytics = async (req, res) => {
    try {
        const ownerId = new mongoose.Types.ObjectId(req.user.id);

        const [totalEarningsResult, totalProperties, totalBookings] = await Promise.all([
            Transaction.aggregate([
                { $match: { ownerId } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            Property.countDocuments({ ownerId: req.user.id }),
            Booking.countDocuments({ ownerId: req.user.id, bookingStatus: 'approved' }),
        ]);

        const totalEarnings = totalEarningsResult[0]?.total || 0;

        // Monthly earnings for last 12 months
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
        twelveMonthsAgo.setDate(1);
        twelveMonthsAgo.setHours(0, 0, 0, 0);

        const monthlyRaw = await Transaction.aggregate([
            { $match: { ownerId, date: { $gte: twelveMonthsAgo } } },
            {
                $group: {
                    _id: { year: { $year: '$date' }, month: { $month: '$date' } },
                    earnings: { $sum: '$amount' },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ]);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyEarnings = [];

        for (let i = 11; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const found = monthlyRaw.find(e => e._id.year === year && e._id.month === month);
            monthlyEarnings.push({ month: monthNames[month - 1], earnings: found ? found.earnings : 0 });
        }

        res.json({ totalEarnings, totalProperties, totalBookings, monthlyEarnings });
    } catch (error) {
        console.error('GET OWNER ANALYTICS ERROR:', error);
        res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
    }
};