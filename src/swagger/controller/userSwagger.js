const { checkTokenErrorSwagger } = require('../filter/checkTokenSwagger')
const { UserSwagger } = require('../model/userSwagger')
const { validParams, checkUserParamError } = require('../../filters/checkUserParam')
const { swaggerErrorListContent } = require('../utilSwagger')
const { wrongParamValueError } = require('../../controllers/userController')
const _ = require('lodash')

const userParameterList = [
    {
        name: 'userparam',
        in: 'path',
        required: true,
        description: 'The parameter that is going to change.',
        schema: { type: 'string' },
        examples: _.mapKeys(validParams, (value, _key) => value)
    }
]

exports.getUserSwagger = {
    get: {
        tags: ['User'],
        summary: 'Get the information of the user which is connected',
        security: [{ cookieAuth: [] }],
        responses: {
            200: {
                description: 'success',
                content: UserSwagger
            },
            401: checkTokenErrorSwagger
        }
    }
}

exports.setParamSwagger = {
    put: {
        tags: ['User'],
        summary: 'Change a parameter for the user. Possibilities: ' + validParams,
        security: [{ cookieAuth: [] }],
        parameters: userParameterList,
        requestBody: {
            description: 'New parameter value',
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: { new: { type: 'string' } }
                    },
                    examples: {
                        email: { value: { new: 'user@email.com' } },
                        password: { value: { new: 'apgfa556a' } },
                        email_password: { value: { new: 'qf68aga' } },
                        full_name: { value: { new: 'username' } }
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'success',
                content: UserSwagger
            },
            401: checkTokenErrorSwagger,
            404: {
                description: 'Invalid parameter, or value was not provided in body.',
                content: swaggerErrorListContent(
                    Array.prototype.concat(
                        validParams.map(param => wrongParamValueError(param)),
                        [checkUserParamError]
                    )
                )
            }
        }
    }
}
