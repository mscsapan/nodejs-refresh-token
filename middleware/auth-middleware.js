import jwt from "jsonwebtoken";
import ApiError from "../utils/api-errors.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) throw new ApiError(403, 'Token expire');

        req.user = user;
        next();
    });
};

export default authMiddleware;