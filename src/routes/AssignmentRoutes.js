import {
    createAssignment,
    deleteAssignment,
    updateAssignment,
    assignAssignment,
    getAssignmentFeed,
} from '../controllers/AssignmentController.js'

import { verifyTokenRest } from '../middleware/authMiddleware.js'

import { Router } from 'express'

const assignmentRouter = Router()

assignmentRouter.get('/feed', verifyTokenRest, getAssignmentFeed)

assignmentRouter.post('/', verifyTokenRest, createAssignment)

assignmentRouter.post('/assign', verifyTokenRest, assignAssignment)

assignmentRouter.put('/', verifyTokenRest, updateAssignment)

assignmentRouter.delete('/', verifyTokenRest, deleteAssignment)

export default assignmentRouter
