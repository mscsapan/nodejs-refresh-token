import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: { type: String, unique: true },
        phone: String,
        password: String,
        gender: String,
        refreshToken: String,
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);