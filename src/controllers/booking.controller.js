import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";

export const createBooking = async (req, res, next) => {
    try {
        const { propertyId, moveInDate, contactNumber, additionalNotes } = req.body;

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        if (property.status !== "approved") {
            return res.status(400).json({ message: "Property is not available for booking" });
        }

        const booking = await Booking.create({
            propertyId,
            tenantId: req.user.id,
            ownerId: property.ownerId,
            moveInDate,
            contactNumber,
            additionalNotes,
            amount: property.rent,
            bookingStatus: "pending",
            paymentStatus: "unpaid",
        });

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        next(error);
    }
};

export const getTenantBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ tenantId: req.user.id })
            .populate("propertyId", "title location images rent rentType")
            .sort({ createdAt: -1 });

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

export const getOwnerBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ ownerId: req.user.id })
            .populate("propertyId", "title location images rent")
            .populate("tenantId", "name email photo")
            .sort({ createdAt: -1 });

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

export const getAdminBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate("propertyId", "title location rent")
            .populate("tenantId", "name email")
            .populate("ownerId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

export const getBookingById = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("propertyId", "title location images rent rentType")
            .populate("tenantId", "name email photo")
            .populate("ownerId", "name email");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const isOwner = booking.ownerId?._id.toString() === req.user.id;
        const isTenant = booking.tenantId?._id.toString() === req.user.id;
        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isTenant && !isAdmin) {
            return res.status(403).json({ message: "Not authorized to view this booking" });
        }

        res.status(200).json({ booking });
    } catch (error) {
        next(error);
    }
};

export const updateBookingStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be approved or rejected" });
        }

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this booking" });
        }

        booking.bookingStatus = status;
        await booking.save();

        res.status(200).json({ message: `Booking ${status} successfully`, booking });
    } catch (error) {
        next(error);
    }
};