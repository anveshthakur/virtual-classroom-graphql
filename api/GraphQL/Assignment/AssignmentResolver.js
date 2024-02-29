import { verifyToken } from '../../middleware/authMiddleware.js'
import {
    assignAssignmentForStudents,
    createAssignmentService,
    deleteAssignmentService,
    getAssignmentFeedService,
    updateAssignmentService,
} from '../../services/AssignmentService.js'

export const assignmentResolvers = {
    Query: {
        getAssignmentFeed: async (parent, { status }, { req }) => {
            const userPayload = verifyToken(req)
            const assignments = await getAssignmentFeedService(
                userPayload,
                status
            )

            return assignments
        },
    },

    Mutation: {
        createAssignment: async (
            parent,
            { description, deadline, publishedAt },
            { req }
        ) => {
            const userPayload = verifyToken(req)
            await createAssignmentService(
                { description, deadline, publishedAt },
                userPayload
            )

            return 'Assignment created successfully'
        },

        assignAssignment: async (
            parent,
            { assignmentId, studentIdArray },
            { req }
        ) => {
            const userPayload = verifyToken(req)
            await assignAssignmentForStudents(
                { assignmentId, studentIdArray },
                userPayload
            )
            return 'Assignment assigned Successfully'
        },

        updateAssignment: async (
            parent,
            { description, deadline, publishedAt, assignmentId },
            { req }
        ) => {
            const userPayload = verifyToken(req)
            await updateAssignmentService(
                {
                    updatePayload: { description, deadline, publishedAt },
                    assignmentId,
                },
                userPayload
            )

            return 'Assignment updated successfully'
        },

        deleteAssignment: async (parent, { assignmentId }, { req }) => {
            const userPayload = verifyToken(req)
            await deleteAssignmentService(assignmentId, userPayload)

            return 'Assignment deleted successfully'
        },
    },
}
