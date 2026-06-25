import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./utils/db.js";
import "./models/user.model.js";
import "./models/property.model.js";
import "./models/booking.model.js";
import "./models/transaction.model.js";
import "./models/review.model.js";
import "./models/favorite.model.js";
import healthRoute from "./routes/health.route.js";
import propertyRouter from './routes/property.route.js';
import reviewRouter from './routes/review.route.js';
import bookingRouter from "./routes/booking.route.js";
import paymentRouter from "./routes/payment.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();


app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/health", healthRoute);
app.use('/api/properties', propertyRouter);
app.use('/api/reviews', reviewRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});