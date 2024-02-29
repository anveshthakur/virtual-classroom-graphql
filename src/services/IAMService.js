import {
    ForbiddenRequestError,
    InvalidRequestError,
} from '../common/GlobalExceptionHandler.js'
import jwt from 'jsonwebtoken'
import { checkUserExistsWithPassword } from '../repository/UserRepository.js'

export const generateTokenForRequest = async (userName, password) => {
    if (userName === undefined || userName === '') {
        throw new InvalidRequestError('Invalid username')
    }

    if (password === undefined || password === '') {
        throw new InvalidRequestError('Invalid password')
    }

    const user = await checkUserExistsWithPassword(userName, password)

    const token = jwt.sign(
        { userId: user.id, claims: user.role },
        process.env.APP_SECRET_KEY,
        {
            expiresIn: '8h',
        }
    )

    return { token }
}

export const checkClaimsForTutor = (claims) => {
    if (claims === 'student') {
        throw new ForbiddenRequestError('Unauthorized request')
    }
}

export const checkClaimsForStudent = (claims) => {
    if (claims === 'tutor') {
        throw new ForbiddenRequestError('Unauthorized request')
    }
}
