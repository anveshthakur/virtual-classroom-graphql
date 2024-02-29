import { CustomError } from '../common/GlobalExceptionHandler.js'
import { responseWrapper } from '../common/ReponseWrapper.js'
import {
    createSubmissionService,
    getSubmissionByAssignmentId,
} from '../services/SubmissionService.js'

export const createSubmission = async (req, res) => {
    try {
        const { assignmentId } = req.query
        await createSubmissionService(assignmentId, req.decoded)
        responseWrapper(res, 201, 'Success', {
            message: 'Assignment submitted successfully',
        })
    } catch (err) {
        console.log(
            'file: IAMController.js:10 ~ LoginUser ~ err::',
            err.message
        )
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

export const getSubmission = async (req, res) => {
    try {
        const { assignmentId } = req.query
        const response = await getSubmissionByAssignmentId(
            assignmentId,
            req.decoded
        )
        responseWrapper(res, 200, 'Success', { data: response })
    } catch (err) {
        console.log(
            'file: IAMController.js:10 ~ LoginUser ~ err::',
            err.message
        )
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
