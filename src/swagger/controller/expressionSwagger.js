const {
    expressionBodyPrototype,
    addExpressionInvalidBody,
    deleteExpressionMessage
} = require('../../controllers/expressionController')
const { swaggerJsonContent, swaggerErrorContent, messageComponentSwagger } = require('../utilSwagger')
const { RegexSwagger } = require('../model/regexSwagger')
const { badBodyErrorSwagger } = require('../filter/checkBodySwagger')
const { checkTokenErrorSwagger } = require('../filter/checkTokenSwagger')

const expressionBodyExample = {
    expression: 'user+*@gmail.com'
}

/**
 * OpenAPI description of the addExpression routes
 * - it is given a path in the swagger/route directory
 * - depending on isWhite, it describes the /whitelist or the /blacklist route
 * @param {boolean} isWhite
 */
exports.addExpressionSwagger = isWhite => {
    const color = isWhite ? 'white' : 'black'
    return {
        post: {
            tags: ['List', 'Expression'],
            summary: `Add an expression or an email to the ${color}list.`,
            security: [{ cookieAuth: [] }],
            requestBody: {
                description: 'Contains the expression that must be added',
                required: true,
                content: swaggerJsonContent(expressionBodyPrototype, expressionBodyExample)
            },
            responses: {
                201: {
                    description: `The expression has been added to the database, either in ${color}List or in ${color}ListRegularExpression`,
                    content: RegexSwagger
                },
                400: swaggerErrorContent(addExpressionInvalidBody(color)),
                401: checkTokenErrorSwagger,
                404: badBodyErrorSwagger(`/list/${color}list/add-body`, expressionBodyPrototype)
            }
        }
    }
}

/**
 * OpenAPI description of the getExpression routes
 * - it is given a path in the swagger/route directory
 * - depending on isWhite, it describes the /whitelist or the /blacklist route
 * @param {boolean} isWhite
 */
exports.getExpressionSwagger = isWhite => {
    const color = isWhite ? 'white' : 'black'
    return {
        get: {
            tags: ['List', 'Expression'],
            summary: `Get the expressions and emails from ${color}list`,
            security: [{ cookieAuth: [] }],
            responses: {
                200: {
                    description: `The list of expressions and emails in the ${color}list`,
                    content: swaggerJsonContent({ type: 'string[]' }, [
                        'user@gmail.com',
                        'user+*@gmail.com'
                    ])
                },
                401: checkTokenErrorSwagger
            }
        }
    }
}

/**
 * OpenAPI description of the addExpression routes
 * - it is given a path in the swagger/route directory
 * - depending on isWhite, it describes the /whitelist or the /blacklist route
 * @param {boolean} isWhite
 */
exports.deleteExpressionSwagger = {
    post: {
        tags: ['List', 'Expression'],
        summary: `Delete an expression or an email from the whitelist and blacklist`,
        security: [{ cookieAuth: [] }],
        requestBody: {
            description: 'Contains the expression that must be deleted',
            required: true,
            content: swaggerJsonContent(expressionBodyPrototype, expressionBodyExample)
        },
        responses: {
            200: {
                description: `The expression has been removed to the database`,
                content: messageComponentSwagger(deleteExpressionMessage)
            },
            401: checkTokenErrorSwagger,
            404: badBodyErrorSwagger(`/list/delete-body`, expressionBodyPrototype)
        }
    }
}
