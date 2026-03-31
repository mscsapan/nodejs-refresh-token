const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    let message = err.message;

    try {
        message = JSON.parse(err.message);
    } catch (_) { }

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export default errorHandler;