// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Wrong MongoDB ID
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Resource not found`;
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;
        message = `${Object.keys(err.keyValue)} already exists`;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    }

    //Multer File Upload Errors
    if(err.code === "LIMIT_FILE_SIZE") {
        statusCode = 400;
        message = "File size is too large. Max limit is 10MB."
    }

    // JWT Errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired";
    }

    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });

    res.status(statusCode).json({
        success: false,
        error: message,
        statusCode,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export default errorHandler;