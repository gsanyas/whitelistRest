exports.RegexSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: { expression: { type: 'string' } },
            example: { expression: 'user+*@gmail.com' }
        }
    }
}
