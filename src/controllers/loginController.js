const { User } = require('../models/user')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const cookieConfig = {
    httpOnly: false, // set true in final version, without the proxy
    //secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: false //the token is already signed
}

/**
 * Controller for Login Operations
 * See the OpenAPI documentation for more information
 */
exports.loginController = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ where: { email: email } })
    if (user === null) {
        res.status(404).send({ message: "Error : user don't exist" })
    } else {
        if (password === user['password']) {
            // TODO: check the password with the hash the password
            const privateKey = fs.readFileSync('./private.pem', 'utf8')
            const token = jwt.sign({ id: user['id'] }, privateKey, { algorithm: 'HS256' })
            res.cookie('authcookie', token, cookieConfig)
            res.status(200).send({ setCookie: true })
        } else {
            res.status(403).send({ message: 'Error : invalid password' })
        }
    }
}

/**
 * Swagger documentation
 */
exports.loginSwagger = {
    post: {
        tags: ['Login'],
        summary: 'Login',
        requestBody: {
            description: 'Connexion information',
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string' },
                            password: { type: 'string' }
                        },
                        example: { email: 'user1@email.com', password: 'user56' }
                    }
                }
            }
        },
        security: [],
        responses: {
            200: {
                description:
                    "Successfully authenticated. The session ID is returned in a cookie named 'authcookie'. You need to include this cookie in subsequent request.",
                headers: {
                    'Set-Cookie': {
                        schema: { type: 'string', example: 'authcookie=56FZ65fez5; PATH=/' }
                    }
                },
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: { setCookie: { type: 'boolean' } },
                            example: { setCookie: true }
                        }
                    }
                }
            },
            403: {
                description:
                    'The user address was found, but the password given is not the correct one.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: { message: { type: 'string' } },
                            example: { message: 'Error : invalid password' }
                        }
                    }
                }
            },
            404: {
                description: 'The user address was not found.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: { message: { type: 'string' } },
                            example: { message: "Error : user don't exist" }
                        }
                    }
                }
            }
        }
    }
}
