require('dotenv').config()
const { createUser } = require('../services/userServices')
const { messageComponent } = require('../utils')

// TODO (possible): check the connection with the IMAP server (before the register in another endpoint)
exports.register = async (req, res) => {
    const user = createUser(
        req.body.email,
        req.body.password,
        req.body.full_name,
        req.body.email_password
    )
    const userSaved = user.save()
    if (userSaved) {
        res.status(201).json({ message: 'Successfully created.' })
    } else {
        res.status(404).json({ message: 'Register Error' })
    }
}

/**
 * Swagger documentation
 */
exports.registerSwagger = {
    post: {
        tags: ['Register'],
        summary: 'Register',
        requestBody: {
            description: 'Account information',
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string' },
                            password: { type: 'string' },
                            full_name: { type: 'string' },
                            email_password: { type: 'string' }
                        },
                        example: {
                            email: 'user1@email.com',
                            password: 'user56',
                            full_name: 'user1',
                            email_password: 'userpass'
                        }
                    }
                }
            }
        },
        security: [],
        responses: {
            201: {
                description: 'Successfully authenticated.',
                content: messageComponent('Successfully created.')
            },
            404: {
                description: 'Register error.',
                content: messageComponent('Register Error')
            }
        }
    }
}
