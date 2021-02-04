const express = require('express')
const router = express.Router()

const { loginController, loginBodyPrototype } = require('../controllers/loginController')
const { register, registerBodyPrototype } = require('../controllers/registerController')
const { checkBody } = require('../filters/checkBody')
const { checkTokenErrorSwagger } = require('../filters/checktoken')
const { loginSwagger } = require('../swagger/loginSwagger')
const { registerSwagger } = require('../swagger/registerSwagger')
const { swaggerJsonContent } = require('../utils')

router.post('/login', checkBody('/login-body', loginBodyPrototype), loginController)
router.post('/register', checkBody('/register-body', registerBodyPrototype), register)
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
