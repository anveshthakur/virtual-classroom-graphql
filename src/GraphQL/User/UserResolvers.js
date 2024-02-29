import { generateTokenForRequest } from '../../services/IAMService.js'

export const userResolvers = {
    Query: {
        login: async (_parent, { username, password }, _ctx) => {
            return await generateTokenForRequest(username, password)
        },
    },
}
