import { Router } from "express";
import {
    createPaymentIntent,
    confirmPayment,
} from "../controllers/payment.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = Router();

router.post("/create-intent", requireAuth, requireRole("tenant"), createPaymentIntent);
router.post("/confirm", requireAuth, requireRole("tenant"), confirmPayment);

export default router;