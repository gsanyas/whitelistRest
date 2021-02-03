const express = require('express')
const router = express.Router()

const { loginController, loginSwagger } = require('../controllers/loginController')
const { register, registerSwagger } = require('../controllers/registerController')

router.post('/login', loginController)
router.post('/register', register)
router.get('/auth/connect', async (_req, res) => {
    res.status(200).send({ connected: true })
})

exports.router = router
exports.swagger = {
    '/login': loginSwagger,
    '/register': registerSwagger,
    '/auth/connect': {
        get: {
            security: [{ cookieAuth: [] }],
            summary: 'Test connection',
            responses: {
                200: {
                    description: 'success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: { connected: { type: 'boolean' } },
                                example: { connected: true }
                            }
                        }
                    }
                },
                // prettier-ignore
                401: { "\$ref": '#/components/responses/UnauthorizedError' }
            }
        }
    }
}
