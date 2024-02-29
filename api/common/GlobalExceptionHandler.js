import constants from './contants.js'

export class CustomError extends Error {
    statusCode
    constructor(message, statusCode) {
        super(message)
        if (statusCode !== undefined) {
            this.statusCode = statusCode
        } else {
            statusCode = 500
        }
    }
}

export class ResouceNotFoundError extends CustomError {
    constructor(message) {
        if (message === undefined) {
            message = constants.RESOURCE_NOT_FOUND
        }
        super(message, 404)
    }
}

export class InternalServerError extends CustomError {
    constructor(message) {
        if (message === undefined) {
            message = constants.INTERNAL_SERVER_ERROR
        }
        super(message, 500)
    }
}

export class UnauthorizedRequestError extends CustomError {
    constructor(message) {
        if (message === undefined) {
            message = constants.UNAUTHORIZED_REQUEST
        }
        super(message, 401)
    }
}

export class InvalidRequestError extends CustomError {
    constructor(message) {
        if (message === undefined) {
            message = constants.INVALID_REQUEST
        }
        super(message, 400)
    }
}

export class ConflictRequestError extends CustomError {
    constructor(message) {
        if (message === undefined) {
            message = constants.CONFLICT_REQUEST
        }
        super(message, 409)
    }
}

export class ForbiddenRequestError extends CustomError {
    constructor(message) {
        if (message === undefined) {
            message = constants.FORBIDDEN_REQUEST
        }
        super(message, 403)
    }
}
