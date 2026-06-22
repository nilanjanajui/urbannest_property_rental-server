import { Router } from "express";
import {
    createBooking,
    getTenantBookings,
    getOwnerBookings,
    getAdminBookings,
    getBookingById,
    updateBookingStatus,
} from "../controllers/booking.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = Router();

// Named routes MUST come before /:id
router.get("/tenant", requireAuth, requireRole("tenant"), getTenantBookings);
router.get("/owner", requireAuth, requireRole("owner"), getOwnerBookings);
router.get("/admin", requireAuth, requireRole("admin"), getAdminBookings);

router.post("/", requireAuth, requireRole("tenant"), createBooking);
router.get("/:id", requireAuth, getBookingById);
router.patch("/:id/status", requireAuth, requireRole("owner"), updateBookingStatus);

export default router;