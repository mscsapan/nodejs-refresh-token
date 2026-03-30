import express from 'express';
const router = express.Router();
import authController = require("../controllers/authController");
import authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Protected data", user: req.user });
});

module.exports = router;