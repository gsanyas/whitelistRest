exports.UserSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                full_name: { type: 'string' },
                email: { type: 'string' }
            },
            example: {
                id: 5,
                full_name: 'johndoe',
                email: 'johndoe@email.com'
            }
        }
    }
}
