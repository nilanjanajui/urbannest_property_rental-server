const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;

// This route provides a simple health check endpoint at /api/health that returns a JSON response indicating the server is running, along with a timestamp.