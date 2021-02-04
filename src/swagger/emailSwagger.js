const { checkTokenErrorSwagger } = require('../filters/checktoken')
const { QuarantineSwagger } = require('../models/quarantine')
const { messageComponent } = require('../utils')

exports.getEmailSwagger = {
    get: {
        tags: ['Email'],
        summary: 'Get all the users emails',
        security: [{ cookieAuth: [] }],
        responses: {
            200: {
                description: 'success',
                content: QuarantineSwagger
            },
            401: checkTokenErrorSwagger
        }
    }
}

exports.deleteEmailSwagger = {
    delete: {
        tags: ['Email'],
        summary: 'Delete the selected email.',
        security: [{ cookieAuth: [] }],
        responses: {
            200: {
                description: 'Email deleted',
                content: messageComponent('Email deleted.')
            },
            401: checkTokenErrorSwagger
        }
    }
}
