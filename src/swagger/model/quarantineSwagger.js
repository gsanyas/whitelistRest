exports.QuarantineSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email_sender: { type: 'string' },
                email_subject: { type: 'string' },
                email_size: { type: 'number' },
                created_at: { type: 'string' }
            },
            example: {
                id: '6e5gr3zgeg65g65z6',
                email_sender: 'jack@email.com',
                email_subject: 'hello',
                email_size: 150,
                created_at: '2021-01-25 ...'
            }
        }
    }
}
