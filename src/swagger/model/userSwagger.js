exports.UserSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                full_name: { type: 'string' },
                email: { type: 'string' }
            },
            example: {
                full_name: 'johndoe',
                email: 'johndoe@email.com'
            }
        }
    }
}
