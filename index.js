import dotenv from 'dotenv';

dotenv.config();
import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected");
        app.listen(5000, () => console.log("Server running"));
    });