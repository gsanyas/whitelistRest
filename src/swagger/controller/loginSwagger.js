const {
    loginBodyPrototype,
    loginSuccessMessage,
    loginWrongPasswordError,
    loginBadUserError
} = require('../../controllers/loginController')
const {
    swaggerJsonContent,
    swaggerErrorContent,
    swaggerErrorListContent
} = require('../utilSwagger')

const { badBodyError } = require('../../filters/checkBody')

const loginSuccessPrototype = {
    setCookie: {
        type: 'boolean',
        optional: false,
        description:
            'Always true, indicates that everything went well and that the token is in the header set-cookie.'
    }
}

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
                        properties: loginBodyPrototype,
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
                content: swaggerJsonContent(loginSuccessPrototype, loginSuccessMessage)
            },
            403: {
                description:
                    'The user address was found, but the password given is not the correct one.',
                content: swaggerErrorContent(loginWrongPasswordError)
            },
            404: {
                description: 'The user was not found or some parameter is missing.',
                content: swaggerErrorListContent({
                    body: badBodyError('/login-body', loginBodyPrototype),
                    user: loginBadUserError
                })
            }
        }
    }
}
