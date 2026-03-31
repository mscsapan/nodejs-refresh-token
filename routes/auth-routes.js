import express from "express";
import {
    register,
    login,
    refresh,
    logout,
} from "../controllers/auth-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import validate from "../middleware/validation-middleware.js";
import {
    validateRegister,
    validateLogin,
} from "../validators/auth-validators.js";


const router = express.Router();

router.post("/register", validate(validateRegister), register);
// router.post("/login", validate(validateLogin), login);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Protected route", user: req.user });
});

export default router;