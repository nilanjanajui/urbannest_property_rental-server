import Transaction from "../models/transaction.model.js";

export const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()
            .populate("propertyId", "title location")
            .populate("tenantId", "name email")
            .populate("ownerId", "name email")
            .sort({ date: -1 });

        res.json({ transactions });
    } catch (error) {
        next(error);
    }
};