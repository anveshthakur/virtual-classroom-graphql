import mysql from 'mysql2'

let instance = null

//Singleton instance to define the db connection
class ConnectionPool {
    constructor() {
        if (!instance) {
            instance = this
            this.pool = mysql
                .createPool({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    queueLimit: 0,
                    connectionLimit: 10,
                    waitForConnections: true,
                })
                .promise()
        }

        return instance
    }

    getPool() {
        return this.pool
    }
}

export default ConnectionPool
