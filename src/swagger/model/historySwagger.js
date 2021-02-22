exports.HistorySwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                email_sender: { type: 'string' },
                email_subject: { type: 'string' },
                reason: { type: 'string' },
                created_at: { type: 'string' }
            },
            example: {
                email_sender: 'jack@email.com',
                email_subject: 'hello',
                reason: 'deleted',
                created_at: '2021-01-25 ...'
            }
        }
    }
}
