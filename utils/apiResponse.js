// Simple response helpers

function sendSuccess(res, data, statusCode = 200) {
    return res.status(statusCode).json({
        status: 'success',
        data: data,
    });
}

function sendError(res, message, statusCode = 400) {
    return res.status(statusCode).json({
        status: 'error',
        message: message,
    });
}

export { sendSuccess, sendError };
