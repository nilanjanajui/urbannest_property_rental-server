import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    },
    { timestamps: true }
);

favoriteSchema.index({ tenantId: 1, propertyId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);