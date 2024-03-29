const {
    registerBodyPrototype,
    registerEmailError
} = require('../../controllers/registerController')
const { UserSwagger } = require('../model/userSwagger')
const { badBodyErrorSwagger } = require('../filter/checkBodySwagger')
const { swaggerJsonContent, swaggerErrorContent } = require('../utilSwagger')

const registerBodyExample = {
    email: 'user1@email.com',
    password: 'user56',
    full_name: 'user1',
    email_password: 'userpass'
}

exports.registerSwagger = {
    post: {
        tags: ['Register'],
        summary: 'Register',
        requestBody: {
            description: 'Account information',
            required: true,
            content: swaggerJsonContent(registerBodyPrototype, registerBodyExample)
        },
        security: [],
        responses: {
            201: {
                description: 'Successfully authenticated.',
                content: UserSwagger
            },
            400: {
                description: 'The email already exists.',
                content: swaggerErrorContent(registerEmailError)
            },
            404: badBodyErrorSwagger('/register-body', registerBodyPrototype)
        }
    }
}
