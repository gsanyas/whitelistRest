const { checkTokenErrorSwagger } = require('../filter/checkTokenSwagger')
const { loginSwagger } = require('../controller/loginSwagger')
const { registerSwagger } = require('../controller/registerSwagger')
const { swaggerJsonContent } = require('../utilSwagger')

exports.lrRouteSwagger = {
    '/login': loginSwagger,
    '/register': registerSwagger,
    '/auth/connect': {
        get: {
            security: [{ cookieAuth: [] }],
            summary: 'Test connection',
            responses: {
                200: {
                    description: 'success',
                    content: swaggerJsonContent(
                        { connected: { type: 'boolean' } },
                        { connected: true }
                    )
                },
                401: checkTokenErrorSwagger
            }
        }
    }
}
