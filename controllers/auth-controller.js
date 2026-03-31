import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/api-errors.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/token.js";

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, "Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new ApiError(404, "User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new ApiError(400, "Invalid credentials");

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            success: true,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
};

// REFRESH TOKEN
export const refresh = async (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(401).json({ message: "No token" });

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ message: "Invalid token" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
        if (err)
            return res.status(403).json({ message: "Expired refresh token" });

        const newAccessToken = generateAccessToken(user);

        res.json({ accessToken: newAccessToken });
    });
};

// LOGOUT
export const logout = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.sendStatus(204);

    user.refreshToken = null;
    await user.save();

    res.json({ message: "Logged out" });
};

export const home = async (req, res) => {
    res.json({ message: "Welcome to refresh token backend api" });
};