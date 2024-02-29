import {
    assignAssignmentForStudents,
    createAssignmentService,
    deleteAssignmentService,
    getAssignmentFeedService,
    updateAssignmentService,
} from '../services/AssignmentService.js'
import { CustomError } from '../common/GlobalExceptionHandler.js'
import { responseWrapper } from '../common/ReponseWrapper.js'

export const createAssignment = async (req, res) => {
    try {
        await createAssignmentService(req.body, req.decoded)
        responseWrapper(res, 201, 'Success', {
            message: 'Assignment created successfully',
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

export const updateAssignment = async (req, res) => {
    try {
        await updateAssignmentService(req.body, req.decoded)
        responseWrapper(res, 204, 'Success')
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

export const assignAssignment = async (req, res) => {
    try {
        await assignAssignmentForStudents(req.body, req.decoded)
        responseWrapper(res, 200, 'Success', {
            message: 'Successfully assigned assignments',
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

export const deleteAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.query
        await deleteAssignmentService(assignmentId, req.decoded)
        responseWrapper(res, 204, 'Success', {})
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

export const getAssignmentFeed = async (req, res) => {
    try {
        const { status } = req.query
        const response = await getAssignmentFeedService(req.decoded, status)
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
