const { swaggerErrorContent } = require('../utilSwagger')
const { badBodyError } = require('../../filters/checkBody')

exports.badBodyErrorSwagger = (type, prototype) => ({
    description: 'Invalid request body.',
    content: swaggerErrorContent(badBodyError(type, prototype))
})
