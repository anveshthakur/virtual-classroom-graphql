import { CustomError } from '../common/GlobalExceptionHandler.js'
import { responseWrapper } from '../common/ReponseWrapper.js'
import { generateTokenForRequest } from '../services/IAMService.js'

export const LoginUser = async (req, res) => {
    try {
        const { userName, password } = req.body
        const token = await generateTokenForRequest(userName, password)
        responseWrapper(res, 200, 'Success', token)
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

// try {
//     const {} = req.body
//     responseWrapper(res, 200, 'Success', token)
// } catch (err) {
//     console.log('file: IAMController.js:10 ~ LoginUser ~ err::', err.message)
//     if (err instanceof CustomError) {
//         if (err.statusCode === undefined) {
//             err.statusCode = 500
//         }
//         responseWrapper(res, err.statusCode, 'Failure', {
//             status: false,
//             message: err.message,
//         })
//     } else {
//         responseWrapper(res, 500, 'Failure', {
//             status: false,
//             message: err.message,
//         })
//     }
// }
