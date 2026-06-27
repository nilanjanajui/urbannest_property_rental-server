import express from "express";
import { getAllUsers, updateUserRole } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router.get("/", requireAuth, requireRole("admin"), getAllUsers);
router.patch("/:id/role", requireAuth, requireRole("admin"), updateUserRole);

export default router;