import { Router } from 'express'
import { LoginUser } from '../controllers/IAMController.js'

const authRouter = Router()

authRouter.post('/login', LoginUser)

export default authRouter
