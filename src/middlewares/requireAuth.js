import jwt from "jsonwebtoken";
import { auth } from "../lib/auth.js";

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (authHeader?.startsWith("Bearer ")) {
            const token = authHeader.slice(7);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        }

        const session = await auth.api.getSession({ headers: req.headers });
        if (!session?.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = session.user;
        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
};