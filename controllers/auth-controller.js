import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/token.js";

// REGISTER
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, gender } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            gender,
        });

        res.json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
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