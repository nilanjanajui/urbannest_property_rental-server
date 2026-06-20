import { fromNodeHeaders } from "better-auth/node"
import { auth } from "../lib/auth.js"

export const requireAuth = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        })

        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        req.user = session.user
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
}