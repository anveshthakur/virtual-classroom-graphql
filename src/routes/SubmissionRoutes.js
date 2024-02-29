import {
    createSubmission,
    getSubmission,
} from '../controllers/SubmissionController.js'
import { verifyTokenRest } from '../middleware/authMiddleware.js'

import { Router } from 'express'

const submissionRouter = Router()

submissionRouter.post('/', verifyTokenRest, createSubmission)
submissionRouter.get('/', verifyTokenRest, getSubmission)

export default submissionRouter
