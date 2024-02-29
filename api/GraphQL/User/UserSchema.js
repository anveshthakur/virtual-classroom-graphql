import { gql } from 'apollo-server-express'

export const userTypeDefs = gql`
    type UserToken {
        token: String!
    }

    type Query {
        login(username: String!, password: String!): UserToken
    }
`
