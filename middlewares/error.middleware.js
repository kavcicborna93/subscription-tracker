const errorMiddleware = (err, req, res, next) => {
    // interceptor //
    try {
        let error = { ...err};
        error.message = err.message;

        console.error(err);

        // Mongoos bad ObjectId
        if (err.name === 'CastError') {
            const message = 'Resource not found';

            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Validation errors
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(err.statusCode || 500).json({ success: false, error: error.message });
    } catch (error) {
        next(error);
    }
}

// create a subscription --> middleware (check for renewal date) --> middleware (check for errors) -->
// --> next --> controllers

export default errorMiddleware;
