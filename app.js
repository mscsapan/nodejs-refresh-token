import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));

// module.exports = app;
export default app;