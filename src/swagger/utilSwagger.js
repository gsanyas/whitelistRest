const { internalError, errorPrototype, messagePrototype } = require('../utils')

exports.swaggerJsonContent = (properties, example) => ({
    'application/json': {
        schema: {
            type: 'object',
            properties: properties,
            example: example
        }
    }
})
exports.swaggerErrorContent = example => this.swaggerJsonContent(errorPrototype, example)

exports.swaggerJsonList = (properties, examples) => ({
    'application/json': {
        schema: {
            type: 'object',
            properties: properties
        },
        examples: examples
    }
})

exports.swaggerErrorListContent = examples => this.swaggerJsonList(errorPrototype, examples)

exports.messageComponentSwagger = example => {
    return {
        'application/json': {
            schema: {
                type: 'object',
                properties: messagePrototype,
                example: example
            }
        }
    }
}

exports.internalErrorSwagger = this.messageComponentSwagger(internalError)
