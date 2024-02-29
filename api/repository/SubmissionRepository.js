import ConnectionPool from './db.js'

export const checkSubmissionExists = async (assignmentId, userId) => {
    const connection = new ConnectionPool().getPool()
    const [rows] = await connection.query(
        `
        SELECT * FROM submissions where assignment_id = ? and student_id = ?
    `,
        [assignmentId, userId]
    )

    return rows[0]
}

export const createSubmissionQuery = async (assignmentId, studentId) => {
    const connection = new ConnectionPool().getPool()
    const [rows] = await connection.query(
        `
        INSERT INTO submissions (assignment_id, student_id) VALUES (?, ?)
        `,
        [assignmentId, studentId]
    )

    await connection.query(
        `
        UPDATE student_assignment SET submission_status = 'SUBMITTED' 
        where assignment_id = ? and student_id = ?
    `,
        [assignmentId, studentId]
    )

    return rows[0]
}

export const getSubmissionByStudentIdRepository = async (
    studentId,
    assignmentId
) => {
    const connection = new ConnectionPool().getPool()
    const [rows] = await connection.query(
        `select submission_id as submissionId, assignment_id as assignmentId, 
        remark, submitted_at as submittedAt, student_id as studentId
        from submissions where student_id = ? and assignment_id = ?`,
        [studentId, assignmentId]
    )

    return rows[0]
}

export const getAllSubmissionsForAssignment = async (assignmentId, tutorId) => {
    const connection = new ConnectionPool().getPool()
    const [rows] = await connection.query(
        `select s.submission_id as submissionId, s.assignment_id as assignmentId, s.student_id as studentId, 
        s.remark as remark, s.submitted_at as submittedAt
        from submissions s join assignment a on s.assignment_id = a.assignment_id 
        where a.assignment_id = ? and a.tutor_id = ? `,
        [assignmentId, tutorId]
    )

    return rows
}
