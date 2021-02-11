const { swaggerErrorContent } = require('../utilSwagger')
const { checkTokenError } = require('../../filters/checktoken')

exports.checkTokenErrorSwagger = {
    description: 'Authentication information is missing or invalid',
    content: swaggerErrorContent(checkTokenError)
}
