import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 20,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);