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