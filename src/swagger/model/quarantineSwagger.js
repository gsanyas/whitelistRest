exports.QuarantineSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email_sender: { type: 'string' },
                email_subject: { type: 'string' },
                email_size: { type: 'number' }
            },
            example: {
                id: 9,
                email_sender: 'jack@email.com',
                email_subject: 'hello',
                email_size: 150
            }
        }
    }
}
