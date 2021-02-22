const { swaggerErrorContent } = require('../utilSwagger')
const { emailNotFoundErrorMessage } = require('../../filters/checkEmail')

exports.emailNotFoundSwagger = type => ({
    description: 'The requested email was not found.',
    content: swaggerErrorContent(emailNotFoundErrorMessage(type))
})
