import { gql } from 'apollo-server-express'

export const submissionTypeDefs = gql`
    scalar DATETIME

    type Submission {
        submissionId: String!
        studentId: String!
        assignmentId: String!
        remarks: String
        submittedAt: DATETIME!
    }

    type Query {
        getSubmissionForAssignment(assignmentId: Int!): [Submission]
    }

    type Mutation {
        createSubmission(assignmentId: Int!): String!
    }
`
