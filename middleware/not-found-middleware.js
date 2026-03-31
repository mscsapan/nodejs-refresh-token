import ApiError from "../utils/api-errors.js";

const notFound = (req, res, next) => {
    // next(new ApiError(404, `Route not found: ${req.originalUrl}`));
    next(new ApiError(404, `${req.method} method is not allowed`));
};

export default notFound;