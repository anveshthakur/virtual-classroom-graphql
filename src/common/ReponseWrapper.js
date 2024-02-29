export const responseWrapper = async (res, statusCode, message, data) => {
    res.status(statusCode).json({
        message,
        data,
    })
}
