import jwt from 'jsonwebtoken'
import { responseWrapper } from '../common/ReponseWrapper.js'
import {
    CustomError,
    UnauthorizedRequestError,
} from '../common/GlobalExceptionHandler.js'
import 'dotenv/config.js'

export const verifyToken = (req) => {
    const token = req.header('Authorization')
    if (!token) {
        throw new UnauthorizedRequestError('Token not present')
    }

    const extracted = jwt.verify(token, process.env.APP_SECRET_KEY)
    return extracted
}

export const verifyTokenRest = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) {
            throw new UnauthorizedRequestError('Token not present')
        }

        const extracted = jwt.verify(token, process.env.APP_SECRET_KEY)
        req.decoded = extracted
        next()
    } catch (err) {
        console.log('file: IAMController.js:10 ~ LoginUser ~ err::', err)
        if (err instanceof CustomError) {
            if (err.statusCode === undefined) {
                err.statusCode = 500
            }
            responseWrapper(res, err.statusCode, 'Failure', {
                status: false,
                message: err.message,
            })
        } else {
            responseWrapper(res, 500, 'Failure', {
                status: false,
                message: err.message,
            })
        }
    }
}
