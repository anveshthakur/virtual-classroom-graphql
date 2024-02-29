import {
    ConflictRequestError,
    InvalidRequestError,
    ResouceNotFoundError,
} from '../common/GlobalExceptionHandler.js'
import { checkIfAssignmentExistForStudent } from '../repository/AssignmentRepository.js'
import {
    createSubmissionQuery,
    getAllSubmissionsForAssignment,
    getSubmissionByStudentIdRepository,
} from '../repository/SubmissionRepository.js'
import { checkClaimsForStudent } from './IAMService.js'

export const createSubmissionService = async (assignmentId, userPayload) => {
    checkClaimsForStudent(userPayload.claims)

    const assignment = await checkIfAssignmentExistForStudent(
        assignmentId,
        userPayload.userId
    )

    if (!assignment) {
        throw new ResouceNotFoundError('Assignment not found')
    }

    if (!assignment.assignedStudentId) {
        throw new InvalidRequestError('You are not assigned to this assignment')
    }

    if (assignment.submissionStatus === 'SUBMITTED') {
        throw new ConflictRequestError('Submission already exists')
    }

    await createSubmissionQuery(assignmentId, userPayload.userId)
}

export const getSubmissionByAssignmentId = async (
    assignmentId,
    userPayload
) => {
    if (userPayload.claims === 'student') {
        const submission = await getSubmissionByStudentId(
            userPayload.userId,
            assignmentId
        )
        return [submission]
    } else if (userPayload.claims === 'tutor') {
        const submissions = await getSubmissionsByAssignmentId(
            assignmentId,
            userPayload.userId
        )
        return submissions
    }
}

const getSubmissionByStudentId = async (studentId, assignmentId) => {
    return getSubmissionByStudentIdRepository(studentId, assignmentId)
}

const getSubmissionsByAssignmentId = async (tutorId, assignmentId) => {
    return await getAllSubmissionsForAssignment(tutorId, assignmentId)
}
