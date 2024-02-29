import { checkClaimsForTutor } from './IAMService.js'
import { convertToSqlDate, isFutureDate } from '../common/utils.js'
import {
    ForbiddenRequestError,
    InvalidRequestError,
    ResouceNotFoundError,
} from '../common/GlobalExceptionHandler.js'
import {
    assignAssignmentRespository,
    checkIfAssignmentExists,
    createAssignmentRepository,
    deleteAssignmentRespository,
    getAllAssignmentStudent,
    getAllAssignmentTutor,
    updateAssignmentRepository,
} from '../repository/AssignmentRepository.js'

//! IMPORTANT
// Date values to be in epoch values till milliseconds

export const createAssignmentService = async (
    assignmentPayload,
    userPayload
) => {
    // accepts an epoch value for the time fields
    let { publishedAt, deadline } = assignmentPayload

    checkClaimsForTutor(userPayload.claims)
    if (!publishedAt) {
        publishedAt = Date.now().toString()
    }

    if (Number(publishedAt) > Number(deadline)) {
        throw new InvalidRequestError('Deadline should be in future')
    }

    const futureDate = isFutureDate(publishedAt)
    assignmentPayload['publishedAt'] = convertToSqlDate(publishedAt)
    assignmentPayload['deadline'] = convertToSqlDate(deadline)
    assignmentPayload['status'] = futureDate ? 'SCHEDULED' : 'ONGOING'

    await createAssignmentRepository(userPayload.userId, assignmentPayload)
}

export const assignAssignmentForStudents = async (
    assignPayload,
    userPayload
) => {
    const { assignmentId } = assignPayload

    checkClaimsForTutor(userPayload.claims)
    const assignment = await checkIfAssignmentExists(assignmentId)

    if (!assignment) {
        throw new ResouceNotFoundError('Assignment not found')
    }

    if (userPayload.userId !== assignment.tutor_id) {
        throw new ForbiddenRequestError(
            'You are not allowed to assign students to this assignment'
        )
    }

    await assignAssignmentRespository(assignPayload)
}

export const updateAssignmentService = async (
    assignmentPayload,
    userPayload
) => {
    checkClaimsForTutor(userPayload.claims)
    const { updatePayload } = assignmentPayload

    const assignment = await checkIfAssignmentExists(
        assignmentPayload.assignmentId
    )

    if (!assignment) {
        throw new ResouceNotFoundError('Assignment not found')
    }

    if (userPayload.userId !== assignment.tutor_id) {
        throw new ForbiddenRequestError(
            'You are not allowed to update this resource'
        )
    }

    let publishedAt =
        updatePayload.publishedAt ||
        new Date(assignment.published_at).getTime().toString()

    let deadline =
        updatePayload.deadline ||
        new Date(assignment.deadline).getTime().toString()

    const futureDate = isFutureDate(publishedAt)
    if (Number(publishedAt) > Number(deadline)) {
        throw new InvalidRequestError('Deadline should be in future')
    }

    updatePayload['published_at'] = convertToSqlDate(publishedAt)
    updatePayload['deadline'] = convertToSqlDate(deadline)
    updatePayload['status'] = futureDate ? 'SCHEDULED' : 'ONGOING'
    delete updatePayload['publishedAt']

    await updateAssignmentRepository(assignmentPayload)
}

//TODO: Also delete mapping //TODO: Check deletion of Assignment once with graphql
export const deleteAssignmentService = async (assignmentId, userPayload) => {
    checkClaimsForTutor(userPayload.claims)
    const assignment = await checkIfAssignmentExists(assignmentId)
    if (!assignment) {
        throw new ResouceNotFoundError('Assignment not found')
    }

    if (userPayload.userId !== assignment.tutor_id) {
        throw new ForbiddenRequestError(
            'You are not allowed to delete this resource'
        )
    }

    await deleteAssignmentRespository(assignmentId)
}

export const getAssignmentFeedService = async (userPayload, status) => {
    if (userPayload.claims === 'student') {
        return await getAllAssignmentStudent(userPayload.userId, status)
    }
    if (userPayload.claims === 'tutor') {
        return await getAllAssignmentTutor(userPayload.userId, status)
    }
}
