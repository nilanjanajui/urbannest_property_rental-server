import express from "express";
import { getAllTransactions } from "../controllers/transaction.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router.get("/", requireAuth, requireRole("admin"), getAllTransactions);

export default router;