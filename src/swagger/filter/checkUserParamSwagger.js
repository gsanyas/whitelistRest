const { checkUserParamError } = require('../../filters/checkUserParam')
const { swaggerErrorContent } = require('../utilSwagger')

exports.wrongUserParamSwagger = {
    description: 'The user parameter that is supposed to change was not found',
    content: swaggerErrorContent(checkUserParamError)
}
