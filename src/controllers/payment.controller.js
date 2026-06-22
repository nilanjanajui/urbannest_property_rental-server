import Stripe from "stripe";
import Booking from "../models/booking.model.js";
import Transaction from "../models/transaction.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res, next) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        if (booking.tenantId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }
        if (booking.paymentStatus === "paid") {
            return res.status(400).json({ message: "Booking is already paid" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: booking.amount * 100, // Stripe uses cents
            currency: "usd",
            metadata: {
                bookingId: bookingId,
                tenantId: req.user.id,
            },
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        next(error);
    }
};

export const confirmPayment = async (req, res, next) => {
    try {
        const { bookingId, paymentIntentId } = req.body;

        // Verify the payment actually succeeded on Stripe's end
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ message: "Payment not completed" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        if (booking.tenantId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        booking.paymentStatus = "paid";
        await booking.save();

        const transaction = await Transaction.create({
            transactionId: paymentIntentId,
            bookingId: booking._id,
            propertyId: booking.propertyId,
            tenantId: booking.tenantId,
            ownerId: booking.ownerId,
            amount: booking.amount,
            date: new Date(),
        });

        res.status(200).json({
            message: "Payment confirmed successfully",
            booking,
            transaction,
        });
    } catch (error) {
        next(error);
    }
};