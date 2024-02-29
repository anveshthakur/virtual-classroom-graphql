import { gql } from 'apollo-server-express'

export const assignmentTypeDefs = gql`
    scalar DATETIME

    type Assignment {
        assignmentId: String!
        description: String!
        deadline: DATETIME!
        publishedAt: DATETIME!
        status: String!
        tutorId: ID!
    }

    type Query {
        getAssignmentFeed(status: String!): [Assignment]
    }

    type Mutation {
        createAssignment(
            description: String!
            deadline: String!
            publishedAt: String!
        ): String!

        assignAssignment(assignmentId: Int!, studentIdArray: [Int]!): String!

        updateAssignment(
            assignmentId: Int!
            description: String!
            deadline: String!
            publishedAt: String!
        ): String!

        deleteAssignment(assignmentId: Int!): String!
    }
`
