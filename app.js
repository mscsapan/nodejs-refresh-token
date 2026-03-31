import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/auth-routes.js";
import errorHandler from "./middleware/error-middleware.js";
import notFound from "./middleware/not-found-middleware.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api", routes);

app.use(notFound);

app.use(errorHandler);

export default app;