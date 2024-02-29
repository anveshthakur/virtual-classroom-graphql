import express from 'express'
import 'dotenv/config'
import pkg from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { userTypeDefs } from './GraphQL/User/UserSchema.js'
import { userResolvers } from './GraphQL/User/UserResolvers.js'
import { assignmentTypeDefs } from './GraphQL/Assignment/AssignmentSchema.js'
import { assignmentResolvers } from './GraphQL/Assignment/AssignmentResolver.js'
import { submissionTypeDefs } from './GraphQL/Submission/submissionSchema.js'
import { submissionResolvers } from './GraphQL/Submission/submissionResolvers.js'
import assignmentRouter from './routes/AssignmentRoutes.js'
import submissionRouter from './routes/SubmissionRoutes.js'
import authRouter from './routes/IAMRoutes.js'

const app = express()
app.use(pkg.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/assignment', assignmentRouter)
app.use('/api/v1/submission', submissionRouter)

const server = new ApolloServer({
    typeDefs: [userTypeDefs, assignmentTypeDefs, submissionTypeDefs],
    resolvers: [userResolvers, assignmentResolvers, submissionResolvers],
    context: ({ req }) => ({
        req,
        customHeaders: {
            headers: {
                ...req.headers,
            },
        },
    }),
})

await server.start()

server.applyMiddleware({ app })

app.listen(process.env.APP_PORT, () => {
    console.log(`listening on port ${process.env.APP_PORT}`)
})
