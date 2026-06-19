const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        moveInDate: {
            type: Date,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        additionalNotes: {
            type: String,
            default: "",
        },
        bookingStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["unpaid", "paid"],
            default: "unpaid",
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);