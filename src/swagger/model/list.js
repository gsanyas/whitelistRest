exports.listSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' }
            },
            example: {
                id: 9,
                email: 'jack@email.com'
            }
        }
    }
}