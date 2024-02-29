import {
    ResouceNotFoundError,
    UnauthorizedRequestError,
} from '../common/GlobalExceptionHandler.js'
import ConnectionPool from './db.js'

export const getUserWithUsername = async (username) => {
    const pool = new ConnectionPool().getPool()
    const [rows] = await pool.query('select * from user where username = ?', [
        username,
    ])
    return rows[0]
}

export const getClaimsOfUser = async (username) => {
    const pool = new ConnectionPool().getPool()
    const [rows] = await pool.query('select * from user where username = ?', [
        username,
    ])
    const user = rows[0]
    return user.role
}

export const checkUserExistsWithPassword = async (username, password) => {
    const user = await getUserWithUsername(username)
    if (!user) {
        throw new ResouceNotFoundError('User not found with this username!')
    } else if (password !== user.password) {
        throw new UnauthorizedRequestError('Please enter valid password!')
    }
    return user
}
