import ConnectionPool from './db.js'

export const createAssignmentRepository = async (
    userPayloadId,
    assignmentPayload
) => {
    const connection = new ConnectionPool().getPool()
    await connection.query(
        'INSERT INTO assignment (description, published_at, deadline, status, tutor_id) VALUES (?, ?, ?, ?, ?)',
        [
            assignmentPayload.description,
            assignmentPayload.publishedAt,
            assignmentPayload.deadline,
            assignmentPayload.status,
            userPayloadId,
        ]
    )
}

export const checkIfAssignmentExists = async (assignmentId) => {
    const connection = new ConnectionPool().getPool()
    const [rows] = await connection.query(
        'SELECT * FROM assignment WHERE assignment_id = ?',
        [assignmentId]
    )
    return rows[0]
}

export const deleteAssignmentRespository = async (assignmentId) => {
    const connection = new ConnectionPool().getPool()
    await connection.query(
        'UPDATE assignment SET is_deleted = true WHERE assignment_id = ?',
        [assignmentId]
    )
}

export const assignAssignmentRespository = async (assignPayload) => {
    const { studentIdArray } = assignPayload
    console.log(
        'file: AssignmentRepository.js:38 ~ assignAssignmentRespository ~ studentIdArray::',
        studentIdArray
    )

    let data = []
    studentIdArray.forEach((element) => {
        data.push([assignPayload.assignmentId, element])
    })

    const connection = new ConnectionPool().getPool()
    await connection.query(
        `INSERT INTO student_assignment (assignment_id, student_id) VALUES ?`,
        [data]
    )

    return
}

export const updateAssignmentRepository = async (assignmentPayload) => {
    const { assignmentId, updatePayload } = assignmentPayload
    const connection = new ConnectionPool().getPool()

    await connection.query('UPDATE assignment SET ? WHERE assignment_id = ?', [
        updatePayload,
        assignmentId,
    ])
}

export const checkIfAssignmentExistForStudent = async (
    assignmentId,
    userId
) => {
    const connection = new ConnectionPool().getPool()

    const [rows] = await connection.query(
        `SELECT a.assignment_id, ast.submission_status as submissionStatus, ast.student_id as assignedStudentId from assignment a 
    left join student_assignment ast on a.assignment_id = ast.assignment_id and ast.student_id = ?
    where a.assignment_id = ?`,
        [userId, assignmentId]
    )

    return rows[0]
}

export const getAllAssignmentTutor = async (userId, status) => {
    const connection = new ConnectionPool().getPool()
    const [rows] = await connection.query(
        `select assignment_id as assignmentId, description, published_at as publishedAt,
        deadline, status, tutor_id as tutorId
        from assignment where tutor_id = ? and status = ?`,
        [userId, status]
    )

    return rows
}

export const getAllAssignmentStudent = async (userId, status) => {
    const connection = new ConnectionPool().getPool()
    let queryString
    if (status === 'ALL') {
        queryString = `select a.assignment_id as assignmentId, a.description, a.deadline, 
                a.published_at as publishedAt, a.status, a.tutor_id as tutorId 
                from assignment a join student_assignment ast on a.assignment_id = ast.assignment_id where
                ast.student_id = ?`
    } else {
        queryString = `select a.assignment_id as assignmentId, a.description, a.deadline, 
                a.published_at as publishedAt, a.status, a.tutor_id as tutorId 
                from assignment a join student_assignment ast on a.assignment_id = ast.assignment_id where
                ast.student_id = ? and ast.submission_status = ?`
    }

    const [rows] = await connection.query(queryString, [userId, status])
    return rows
}
