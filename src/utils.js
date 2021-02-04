exports.messageComponent = message => {
    return {
        'application/json': {
            schema: {
                type: 'object',
                properties: { message: { type: 'string' } },
                example: { message: message }
            }
        }
    }
}

exports.wrap = fn => (...args) => fn(...args).catch(args[2])

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

const errorPrototype = {
    type: { type: 'string', description: 'Identifier for th error.' },
    title: { type: 'string', description: 'The error name.' },
    status: { type: 'number', description: 'The HTTP status code associated.' },
    detail: {
        type: 'string',
        description: 'More information on the error, and advices on how to solve it.'
    },
    instance: { type: 'object', description: 'The state of the request. Optional.' }
}

const isObjectCorrect = (testedObject, prototype) => {
    if (!testedObject) {
        return false
    }
    for (const [key, value] of Object.entries(prototype)) {
        if (value.required) {
            if (!testedObject[key]) {
                return false
            } else if (
                value.type === 'object' &&
                !isObjectCorrect(testedObject[key], value.properties)
            ) {
                return false
            }
        }
    }
    return true
}
exports.isObjectCorrect = isObjectCorrect

exports.internalError = this.messageComponent(
    'Internal error in our server. Sorry for the inconvenience.'
)
