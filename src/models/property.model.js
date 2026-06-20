import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        location: { type: String, required: true, trim: true },
        type: { type: String, required: true, enum: ["apartment", "house", "villa", "studio", "office", "shop"] },
        rent: { type: Number, required: true },
        rentType: { type: String, required: true, enum: ["monthly", "weekly", "daily"] },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        size: { type: String, required: true },
        amenities: { type: [String], default: [] },
        images: { type: [String], default: [] },
        extraFeatures: { type: String, default: "" },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        rejectionFeedback: { type: String, default: "" },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Property", propertySchema);