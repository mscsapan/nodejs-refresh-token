import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected");
        app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch((err) => console.log(err));