import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments(),
        ]);

        res.json({ users, pagination: { total, page, totalPages: Math.ceil(total / limit) } });
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (!["tenant", "owner"].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be tenant or owner" });
        }
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User role updated successfully", user });
    } catch (error) {
        next(error);
    }
};