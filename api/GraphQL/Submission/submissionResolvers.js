import { verifyToken } from '../../middleware/authMiddleware.js'
import {
    createSubmissionService,
    getSubmissionByAssignmentId,
} from '../../services/SubmissionService.js'

export const submissionResolvers = {
    Query: {
        getSubmissionForAssignment: async (
            parent,
            { assignmentId },
            { req }
        ) => {
            const userPayload = verifyToken(req)
            const submissions = await getSubmissionByAssignmentId(
                assignmentId,
                userPayload
            )

            return submissions
        },
    },

    Mutation: {
        createSubmission: async (parent, { assignmentId }, { req }) => {
            const userPayload = verifyToken(req)
            await createSubmissionService(assignmentId, userPayload)
            return 'Submission Created Successfully'
        },
    },
}
